const xlsx = require('xlsx');
const client = require('../model/db');

exports.converter = async (req, res) => {
  try {
    const file = req.file;
    const filePath = file.path;

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    await client.connect();
    const db = client.db('mydb');
    const collection = db.collection('applicants');
    //collection.createIndex({ email: 1 }, { unique: true, dropDups: true });
    const response = await collection.insertMany(rows);
    await client.close();
    if (response.acknowledged) {
      res.render('success');
    } else {
      res.render('error');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.index = (req, res) => {
  res.render('index');
};
