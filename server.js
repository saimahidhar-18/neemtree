const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const router = require('./routes/router');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Math.random() * 1000) + '-' + file.originalname);
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage }).single('file'));

app.use(router);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(3000, (req, res) => {
  console.log('Running');
});
