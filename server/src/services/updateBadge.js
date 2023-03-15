import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// dotenv.config({ path: path.join(__dirname, '../', 'config/.env.development') });
dotenv.config({ path: path.join(__dirname, '../', 'config/.env.production') });

import Badge from '../src/models/badge.js'; // なんでこの時だけ.jsが必要なるんだ？

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
  'red1', // 0
  'yellow1', // 1
  'orange1', // 2
  'blue1', // 3
  'violet1', // 4
  'lightGreen1', // 5
  'green1', // 6
  'lightBlue1', // 7
  'grey1', // 8
  'pink1', // 9
  'brown1', // 10
  'black1', // 11
];

const changeBadgeColor = async (id, index) => {
  try {
    const badge = await Badge.findById(id);
    badge.color = colorOptions[index];
    badge.save();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

changeBadgeColor('63d61036dd62007bbaf1ab6e', 11);

// if (process.argv[2] === '--hello') {
//   // node updateBadge.js --hello
//   console.log('hello');
// }
