const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const COLORS = {
  rd: 'rgba(255, 51, 51, 0.85)', // red
  or: 'rgba(255, 139, 51, 0.85)', // orange
  bn: 'rgba(120, 70, 24, 0.85)', // brown
  yl: 'rgba(219, 184, 42, 0.85)', // yellow
  gn: 'rgba(45, 209, 40, 0.85)', // green
  lb: 'rgba(39, 201, 204, 0.85)', // light blue
  bl: 'rgba(39, 80, 204, 0.85)', // blue
  vt: 'rgba(147, 38, 201, 0.85)', // violet
  pk: 'rgba(242, 126, 164, 0.85)', // pink
  gy: 'rgba(156, 156, 156, 0.85)', // gray
  bk: 'rgba(50,50,50, 0.85)', // black
};

const generateData = (directoryName) => {
  const folderPath = path.join(__dirname, 'badgeIcons', directoryName);
  const files = fs.readdirSync(folderPath);
  const JSONCollection = []; // json file用のcollection
  const badgeCollection = {}; // js file用のcollection
  for (let i = 0; i < files.length; i++) {
    // files[i] -> apple.rd.png
    const id = new mongoose.Types.ObjectId();
    const splittedFileName = files[i].split('.');
    const JSONDocument = {}; // json collection用のdocument
    const badgeDocument = {}; // js file collection用のdocument
    JSONDocument['_id'] = { $oid: id };
    JSONDocument['label'] = splittedFileName[0];
    JSONDocument['type'] = directoryName;
    JSONDocument['color'] = COLORS[splittedFileName[1]];
    JSONCollection.push(JSONDocument);
    // ここまでで、json用のdocumentを作って、collectionにappend

    //'camelCase'を'Camel Case'にする。
    badgeDocument['_id'] = id;
    badgeDocument['value'] = splittedFileName[0].replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    });

    badgeDocument['type'] = JSONDocument['type'];
    badgeDocument['color'] = JSONDocument['color'];
    badgeDocument['source'] = `require('../badgeCollection/${files[i]}')`;
    badgeCollection[JSONDocument['label']] = badgeDocument;
  }
  console.log(badgeCollection);

  const p = path.join(__dirname, 'JSON', directoryName + '.json');
  fs.writeFileSync(p, JSON.stringify(JSONCollection));

  const exportString = `const ${directoryName} = ${JSON.stringify(badgeCollection)}`;
  fs.writeFileSync(`${path.join(__dirname, 'badgeCollection', directoryName + '.js')}`, exportString);
};

generateData('foodAndBeverage');
