// えーと。やるべきことは、folderの画像を元にまず、iconのdocumentを作る。その時、folder名を使ってiconとiconTypeのrelationshipを作る事。
// 同時に、badgeも作ることね。作ったicon documentのidを使って、badgeのiconにicon docのidをrefで入れること。そして、badgeとbadgeTypeのrelをつくる。
//作ったiconとbadgeはcache fileにcacheしておく、次に同じものを作らないために。
// iconに関しては、dev,production共通でいいや。面倒臭いから。
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', `config/.env.${process.argv[2]}`) }); //argvは、dev or productionね。
import S3 from 'aws-sdk/clients/s3.js'; //これなんだろね。なんでここだけ.jsが必要、ってなるんだろ。。。
// models
import Badge from '../models/badge.js'; // なんでこの時だけ.jsが必要なるんだ？
// import BadgeType from '../models/badgeType.js';
import BadgeAndBadgeTypeRelationship from '../models/badgeAndBadgeTypeRelationship.js';
import Icon from '../models/icon.js';
// import IconType from '../models/iconAndIconType.js';
import IconAndIconTypeRelationship from '../models/iconAndIconTypeRelationship.js';

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

const typesTable = {
  artsAndCrafts: {
    _id: '640eac88bb51b34346aa01d3',
    // list: artsAndCrafts,
    name: 'artsAndCrafts',
  },
  animes: {
    _id: '640eac88bb51b34346aa01d0',
    // list: animes,
    name: 'animes',
  },
  apps: {
    _id: '640eac88bb51b34346aa01d2',
    // list: apps,
    name: 'apps',
  },
  petsAndAnimals: {
    _id: '640ea1b4ce9f3adbb2038625',
    // list: petsAndAnimals,
    name: 'petsAndAnimals',
  },
  businessAndFinance: {
    _id: '640eac88bb51b34346aa01d4',
    // list: business,
    name: 'businessAndFinance',
  },
  family: {
    _id: '64112c47cec88f566dc8b8c3',
    // list: family,
    name: 'family',
  },
  dancing: {
    _id: '64112c19cec88f566dc8b8c2',
    // list: dancing,
    name: 'dancing',
  },
  education: {
    _id: '640eac88bb51b34346aa01d7',
    // list: education,
    name: 'education',
  },
  fashionAndBeauty: {
    _id: '640eac88bb51b34346aa01d8',
    // list: fashionAndBeauty,
    name: 'fashionAndBeauty',
  },
  fitnessAndHealth: {
    _id: '64112e58cec88f566dc8b8c8',
    // list: fitnessAndHealth,
    name: 'fitnessAndHealth',
  },
  films: {
    _id: '640eac88bb51b34346aa01d1',
    // list: films,
    name: 'films',
  },
  foodsAndDrinks: {
    _id: '640eac88bb51b34346aa01d9',
    // list: foodsAndDrinks,
    name: 'foodsAndDrinks',
  },
  gamings: {
    _id: '640eac88bb51b34346aa01dd',
    // list: gamings,
    name: 'gamings',
  },
  videoGames: {
    _id: '640ee9b67fdd8afc4c5e6965',
    // list: videoGames,
    name: 'videoGames',
  },
  books: {
    _id: '640eacb434dd172e5abbbbd9',
    // list: books,
    name: 'books',
  },
  music: {
    _id: '640eac88bb51b34346aa01df',
    // list: music,
  },
  photography: {
    _id: '64112cafcec88f566dc8b8c5',
    // list: photography,
    name: 'photography',
  },
  spirituality: {
    _id: '64112cdccec88f566dc8b8c6',
    // list: spirituality,
    name: 'spirituality',
  },
  vehicles: {
    _id: '640eac88bb51b34346aa01dc',
    // list: vehicles,
    name: 'vehicles',
  },
  sportsAndOutdoors: {
    _id: '640eac88bb51b34346aa01e3',
    // list: sports,
    name: 'sports',
  },
  tech: {
    _id: '640eac88bb51b34346aa01e4',
    // list: tech,
    name: 'tech',
  },
  writings: {
    _id: '64112cfecec88f566dc8b8c7',
    // list: writings,
    name: 'writings',
  },
  languagesAndEthnic: {
    _id: '6411371dcec88f566dc8b8ce',
    // list: languagesAndEthnic,
    name: 'languagesAndEthnic',
  },
  brands: {
    _id: '6443460443e75c808275f883',
    name: 'brands',
  },
  people: {
    _id: '6443464743e75c808275f884',
    name: 'people',
  },
};

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_FOR_SERVER, // このexpress appのbucketにアクセスするためのunique name。
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY_FOR_SERVER, // そして、それのpassword。
});

const makeNameFromFileName = (fileName) => {
  const filePrefix = fileName.split('.')[0];
  const name = filePrefix.split('-').join(' ');
  const capitalizeFirst = name.charAt(0).toUpperCase() + name.split('.')[0].slice(1);
  return capitalizeFirst;
};

// const badgeAndIconCachePath = path.join(__dirname, '..', '..', 'cache.json');
// 環境に応じて、cache fileを変えましょう。
const createIconAndBadgeAndSendToAWS = async (dirName) => {
  return new Promise(async (resolve, reject) => {
    const imagesFolder = `/Users/yosuke/Desktop/lampost/server/forCreatingIconsAndBadges/${dirName}`;
    const files = fs.readdirSync(imagesFolder); // inputのfolder内のfile達を全部読み込む。
    const badgeAndIconCachePath = path.join(
      __dirname,
      '..',
      '..',
      'cache',
      `${process.env.NODE_ENV}`,
      'badgeAndIconCache.json'
    );
    const cacheData = JSON.parse(fs.readFileSync(badgeAndIconCachePath, 'utf8'));
    for (const file of files) {
      if (!cacheData[file]) {
        const name = makeNameFromFileName(file);
        const icon = await Icon.create({
          url: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/icons/${file}`,
          name: name,
        });
        const iconAndIconTypeRelationship = await IconAndIconTypeRelationship.create({
          icon: icon._id,
          iconType: typesTable[dirName]._id,
        });
        const badge = await Badge.create({
          icon: icon._id,
          name: name,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        });
        const badgeAndBadgeTypeRelationship = await BadgeAndBadgeTypeRelationship.create({
          badge: badge._id,
          badgeType: typesTable[dirName]._id,
        });

        // const filePath = `/Users/yosuke/Desktop/lampost/server/icons/${dirName}/${file}`;
        // const iconFilePath = path.join(__dirname, '..', '..', 'icons', dirName, file);

        const fileStream = fs.createReadStream(
          `/Users/yosuke/Desktop/lampost/server/forCreatingIconsAndBadges/${dirName}/${file}`
        );
        const uploadParams = {
          Bucket: process.env.AWS_S3BUCKET_NAME,
          Body: fileStream,
          Key: `icons/${file}`,
        };
        await s3.upload(uploadParams).promise();
        cacheData[file] = true; // cacheに書き込む
        fs.writeFileSync(badgeAndIconCachePath, JSON.stringify(cacheData));
        console.log(`${file} processed!`);
      }
    }
    resolve();
  });
};

// 同じbadge名が混ざっている。。。
const createDatas = async () => {
  const types = [
    'animes',
    'apps',
    'artsAndCrafts',
    'books', // この3つの間で、なんか起きている。。。　探すか。。。
    'brands', //ここ
    'businessAndFinance', //ここ
    'education',
    'fashionAndBeauty',
    'films',
    'foodsAndDrinks',
    'gamings',
    'music',
    'people',
    'petsAndAnimals',
    'photography',
    'sportsAndOutdoors',
    'tech',
    'videoGames',
    'writings',
    'dancing',
    'vehicles',
  ];
  for (let type of types) {
    const res = await createIconAndBadgeAndSendToAWS(type);
  }
  process.exit();
};
createDatas();

// icon documentだけを作りたいときのprogram.
// meme系とか。後で。。。
const createOnlyIcons = () => {};
// writingと、photographyと、
// iconのbucketも、lampost dev, productionで分けた方がいい。

// 既存のiconを使ってbadgeを作る場合
// 、、、こっちでarrayで['Fiction book', 'Sifi book', 'Math book']をfirst agrで、second argに、使うiconの名前を指定してbadgeを作るようにする。
