var express = require('express');
var router = express.Router();
const upload = require('../helpers/upload');
let directory = './public/images';

router.post('/', async function (req, res, next) {
  let input = 'file'; // client input name
  let filename;
  await upload.uploadPromise(directory, input, req);
  let { nationalCode } = req.body;
  if (req.file) filename = req.file.filename;
  console.log(filename, nationalCode);
  // insert to db or validate
  res.send('OK');
});

module.exports = router;
