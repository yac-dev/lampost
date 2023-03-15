// もっと言えば、argvで、developmentかproductionかを入力して、それに応じてどのenv　fileを取ってくるかを決めるべき。
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', 'config/.env.development') });
// dotenv.config({ path: path.join(__dirname, '../', 'config/.env.production') });
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);
import S3 from 'aws-sdk/clients/s3.js'; //これなんだろね。なんでここだけ.jsが必要、ってなるんだろ。。。
import {
  artsAndCrafts,
  animes,
  apps,
  books,
  business,
  dancing,
  education,
  family,
  foodsAndDrinks,
  fitnessAndHealth,
  fashionAndBeauty,
  films,
  finance,
  gamings,
  videoGames,
  languagesAndEthnic,
  music,
  outdoors,
  petsAndAnimals,
  photography,
  spirituality,
  sports,
  tech,
  vehicles,
  writings,
} from '../../badgeList.js';

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_FOR_SERVER, // このexpress appのbucketにアクセスするためのunique name。
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY_FOR_SERVER, // そして、それのpassword。
});

// models
import Badge from '../models/badge.js'; // なんでこの時だけ.jsが必要なるんだ？
import BadgeType from '../models/badgeType.js';
import BadgeTypeAndBadgeRelationship from '../models/badgeTypeAndBadgeRelationship.js';

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('👍 Database connection succeeded 👍');
  })
  .catch((error) => {
    console.log('💩 Database connection failed... 💩');
    console.log(error);
  });

const colorOptions = [
  'red1',
  'yellow1',
  'orange1',
  'blue1',
  'violet1',
  'lightGreen1',
  'green1',
  'lightBlue1',
  'grey1',
  'pink1',
  'brown1',
  'black1',
];

const makeBadgeNameFromFileName = (fileName) => {
  const filePrefix = fileName.split('.')[0];
  const badgeName = filePrefix.split('-').join(' ');
  const capitalizeFirst = badgeName.charAt(0).toUpperCase() + badgeName.split('.')[0].slice(1);
  return capitalizeFirst;
};

const filterArray = (array, filterArray) => {
  const filterd = array.filter((element) => {
    return filterArray.every((filtering) => {
      return filtering.name !== element.name;
    });
  });
  return filterd;
};

// 要は、cache fileが必要。
export const createBadges = async (dirPath) => {
  try {
    const folder = path.join(__dirname, dirPath); // /Users/yosuke/Desktop/lampost/server/icons/sportsAndActivity
    const type = folder.split('/')[7]; // ここで、badge documentのtypeを決めるのね。
    const badgesData = JSON.parse(fs.readFileSync(`${__dirname}/${dirPath}/cache.json`, 'utf8')); // 前回までに追加したbadgeをここで記録している。
    const files = fs.readdirSync(folder); // 指定のfolderのfileを全部ここでarrayで読み込む。
    for (const file of files) {
      if (file !== 'cache.json') {
        // cache fileに関してはシカトする。
        const badgeName = makeBadgeNameFromFileName(file); // file名からbadge documentのnameを決める。
        const obj = {
          icon: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/icons/${type}/${file}`,
          name: badgeName,
          type: type,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        };
        if (!badgesData[badgeName]) {
          // cacheに今作成中のbadge dataがなければ、object of objectsに追加して、、、それをまんまjsonに書き込む。
          badgesData[badgeName] = obj;
        }
      }
    }

    fs.writeFileSync(`${__dirname}/${dirPath}/cache.json`, JSON.stringify(badgesData)); // 上で書いた通り、追加したbadge datasをjsonに書き込む。
    const badgesDataArray = Object.values(badgesData); //jsonで書き込んだbadge dataをここでarrayにする。
    const remoteBadges = await Badge.find({ type: dirPath }); // 指定folder typeのbadgeを全部取ってくる。
    // console.log('badges json', badgesDataArray);
    // console.log('remote badges', remoteBadges);
    let insertingDocs;
    if (!remoteBadges.length) {
      insertingDocs = badgesDataArray;
    } else {
      // 追加したbadge dataからremoteのbade dataを引いて。残ったものを算出する。
      insertingDocs = filterArray(badgesDataArray, remoteBadges);
    }
    console.log('inserting', insertingDocs);
    // 残ったやつをここで一気に全部insertする。
    await Badge.insertMany(insertingDocs);
    console.log('finished!');
  } catch (error) {
    console.log(error);
  }
};

// dev用。
// awsに上げて,badgeをつくって、かつそれにかんするtypeも作る感じか。
// typeをどうしようか。これ自分で一つ一つやるしかないかね。。。？
// 名前はfile名になる、それはいいとして、typeは自分で決める他ないよな。。。
const createBadge = async () => {
  try {
    const badge = await Badge.create({
      icon: 'https://lampost-dev.s3.us-east-2.amazonaws.com/icons/penguin.png',
      name: 'Penguin',
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    });
    console.log(badge);
  } catch (error) {
    console.log(error);
  }
};
// createBadge();
const createBadgeType = async (name) => {
  try {
    const badgeType = await BadgeType.create({
      name,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    });
  } catch (error) {
    console.log(error);
  }
};
createBadgeType('videoGames');
const updateBadgeSchema = async () => {
  const badgeTypes = await BadgeType.find();
  badgeTypes.forEach((badgeType) => {
    badgeType.total = 0;
    badgeType.save();
  });
};
// updateBadgeSchema();

const badgeTypesTable = {
  artsAndCrafts: {
    _id: '640eac88bb51b34346aa01d3',
    list: artsAndCrafts,
    name: 'artsAndCrafts',
  },
  animes: {
    _id: '640eac88bb51b34346aa01d0',
    list: animes,
    name: 'animes',
  },
  apps: {
    _id: '640eac88bb51b34346aa01d2',
    list: apps,
    name: 'apps',
  },
  petsAndAnimals: {
    _id: '640ea1b4ce9f3adbb2038625',
    list: petsAndAnimals,
    name: 'petsAndAnimals',
  },
  business: {
    _id: '640eac88bb51b34346aa01d4',
    list: business,
    name: 'business',
  },
  finance: {
    _id: '640eac88bb51b34346aa01d5',
    list: finance,
    name: 'finance',
  },
  family: {
    _id: '64112c47cec88f566dc8b8c3',
    list: family,
    name: 'family',
  },
  dancing: {
    _id: '64112c19cec88f566dc8b8c2',
    list: dancing,
    name: 'dancing',
  },
  education: {
    _id: '640eac88bb51b34346aa01d7',
    list: education,
    name: 'education',
  },
  fashionAndBeauty: {
    _id: '640eac88bb51b34346aa01d8',
    list: fashionAndBeauty,
    name: 'fashionAndBeauty',
  },
  fitnessAndHealth: {
    _id: '64112e58cec88f566dc8b8c8',
    list: fitnessAndHealth,
    name: 'fitnessAndHealth',
  },
  films: {
    _id: '640eac88bb51b34346aa01d1',
    list: films,
    name: 'films',
  },
  foodsAndDrinks: {
    _id: '640eac88bb51b34346aa01d9',
    list: foodsAndDrinks,
    name: 'foodsAndDrinks',
  },
  gamings: {
    _id: '640eac88bb51b34346aa01dd',
    list: gamings,
    name: 'gamings',
  },
  videoGames: {
    _id: '640ee9b67fdd8afc4c5e6965',
    list: videoGames,
    name: 'videoGames',
  },
  books: {
    _id: '640eacb434dd172e5abbbbd9',
    list: books,
    name: 'books',
  },
  music: {
    _id: '640eac88bb51b34346aa01df',
    list: music,
  },
  outdoors: {
    _id: '64112c86cec88f566dc8b8c4',
    list: outdoors,
    name: 'outdoors',
  },
  photography: {
    _id: '64112cafcec88f566dc8b8c5',
    list: photography,
    name: 'photography',
  },
  spirituality: {
    _id: '64112cdccec88f566dc8b8c6',
    list: spirituality,
    name: 'spirituality',
  },
  vehicles: {
    _id: '640eac88bb51b34346aa01dc',
    list: vehicles,
    name: 'vehicles',
  },
  sports: {
    _id: '640eac88bb51b34346aa01e3',
    list: sports,
    name: 'sports',
  },
  tech: {
    _id: '640eac88bb51b34346aa01e4',
    list: tech,
    name: 'tech',
  },
  writings: {
    _id: '64112cfecec88f566dc8b8c7',
    list: writings,
    name: 'writings',
  },
  languagesAndEthnic: {
    _id: '6411371dcec88f566dc8b8ce',
    list: languagesAndEthnic,
    name: 'languagesAndEthnic',
  },
  // nature: '640eac88bb51b34346aa01e0',
  // vegetables: '640eac88bb51b34346aa01e1',
  // politics: '640ead24a862be0c12829d4e',
  // professions: '640eacee615e693f22937822',

  // science: '640eac88bb51b34346aa01e5',
  // travel: {
  //   _id: '640eac88bb51b34346aa01e6',
  // },
};

// 一つ一つのcreateは別で、最初のcreationに関してはfile名から作りたいわな。。。。
// まあ、typeごとにfolderを作るか。まあいいや、とりあえず一つのfolderごとにbadgeを作るようにしようか。。。追加のtypeは後で自分で足していけばいい。
// badgeを重複して作るわけにはいかん。だから、なんのbadgeをつくったか、cacheで残しておくといいかもな。
// badge名でcacheしておくか。
// animals

const createBadgeAndSendPngToAWS = async (dirName) => {
  // BadgeTypeAndBadgeRelationship
  return new Promise(async (resolve, reject) => {
    const folder = `/Users/yosuke/Desktop/lampost/server/icons/${dirName}`;
    // const folder = path.join(__dirname, '..', '..',  'icons', dirName); // /Users/yosuke/Desktop/lampost/server/icons/sportsAndActivity
    // const type = folder.split('/')[8];
    const files = fs.readdirSync(folder);
    const badgeCachePath = path.join(__dirname, '..', '..', 'badgeCache.json');
    const badgesData = JSON.parse(fs.readFileSync(badgeCachePath, 'utf8'));
    for (const file of files) {
      const badgeName = makeBadgeNameFromFileName(file);
      // cacheになければcacheに書き込んで、かつbadgeをmongoにつくる。
      if (!badgesData[badgeName]) {
        const obj = {
          icon: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/icons/${file}`,
          name: badgeName,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        };
        // ここでawsにも送ろうか。
        const iconFilePath = `/Users/yosuke/Desktop/lampost/server/icons/${dirName}/${file}`;
        // const iconFilePath = path.join(__dirname, '..', '..', 'icons', dirName, file);
        const fileStream = fs.createReadStream(iconFilePath);

        const uploadParams = {
          Bucket: process.env.AWS_S3BUCKET_NAME,
          Body: fileStream,
          Key: `icons/${file}`,
        };
        await s3.upload(uploadParams).promise();
        badgesData[badgeName] = obj;
        const badge = await Badge.create({
          icon: obj.icon,
          name: obj.name,
          color: obj.color,
        });
        const badgeTypeAndBadgeRelationship = await BadgeTypeAndBadgeRelationship.create({
          badgeType: badgeTypesTable[dirName],
          badge: badge._id,
        });
        console.log(`${file} processed!`);
        fs.writeFileSync(badgeCachePath, JSON.stringify(badgesData));
      }
    }
    resolve();
  });
};

const exec = async () => {
  const res1 = await createBadgeAndSendPngToAWS('animals');
  const res2 = await createBadgeAndSendPngToAWS('animes');
  const res3 = await createBadgeAndSendPngToAWS('art');
  const res4 = await createBadgeAndSendPngToAWS('education');
  const res5 = await createBadgeAndSendPngToAWS('electronics');
  const res6 = await createBadgeAndSendPngToAWS('fashion');
  const res7 = await createBadgeAndSendPngToAWS('films');
  const res8 = await createBadgeAndSendPngToAWS('finance');
  const res9 = await createBadgeAndSendPngToAWS('foodsAndBeverages');
  const res10 = await createBadgeAndSendPngToAWS('gamings');
  const res11 = await createBadgeAndSendPngToAWS('literature');
  const res12 = await createBadgeAndSendPngToAWS('music');
  const res13 = await createBadgeAndSendPngToAWS('nature');
  const res14 = await createBadgeAndSendPngToAWS('philosophy');
  const res15 = await createBadgeAndSendPngToAWS('politics');
  const res16 = await createBadgeAndSendPngToAWS('professions');
  const res17 = await createBadgeAndSendPngToAWS('science');
  const res18 = await createBadgeAndSendPngToAWS('sports');
  const res19 = await createBadgeAndSendPngToAWS('tech');
  const res20 = await createBadgeAndSendPngToAWS('vehicles');
  const res21 = await createBadgeAndSendPngToAWS('videoGames');
};
// exec();

const createBadgesFunc = (type) => {
  return new Promise(async (resolve, reject) => {
    const badgeCachePath = path.join(__dirname, '..', '..', 'badgeCache.json');
    const badgesData = JSON.parse(fs.readFileSync(badgeCachePath, 'utf8'));
    for (const name of badgeTypesTable[type]['list']) {
      if (!badgesData[name]) {
        const obj = {
          icon: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/icons/${type}.png`,
          name: name,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        };
        badgesData[name] = obj;
        const badge = await Badge.create({
          icon: obj.icon,
          name: obj.name,
          color: obj.color,
        });
        const badgeTypeAndBadgeRelationship = await BadgeTypeAndBadgeRelationship.create({
          badgeType: badgeTypesTable[type]['_id'],
          badge: badge._id,
        });
        console.log(`${name} badge created!`);
        fs.writeFileSync(badgeCachePath, JSON.stringify(badgesData));
      }
    }
    resolve();
  });
};

const execCreate = async () => {
  const res1 = await createBadgesFunc('artsAndCrafts');
};

execCreate();
