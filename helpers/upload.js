const mime = require('mime');
const multer = require('multer');

function fileFilter(req, file, cb) {
  const baseFormats = ['image/png', 'image/jpeg'];
  const multerFormats = req.multerFormats
    ? Array.isArray(req.multerFormats)
      ? req.multerFormats
      : []
    : [];
  const authorizedFormats = [...baseFormats, ...multerFormats];
  console.log(authorizedFormats);
  if (authorizedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log('inja');
    cb('فرمت تصویر مجاز نمیباشد', false);
  }
}

exports.uploadImage = (directory, inputName) => {
  if (!directory) throw new Error('no directory in args, uploadImage FUNCTION');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      let extenstion = mime.getExtension(file.mimetype);
      let fileName = Math.round(Math.random() * 785542) + '.' + extenstion;
      cb(null, fileName);
    },
  });
  var upload = multer({ storage: storage, fileFilter: fileFilter }).single(inputName);
  return upload;
};

exports.uploadPromise = (directory, inputName, req, res) => {
  let upload = exports.uploadImage(directory, inputName);
  return new Promise((r, j) => {
    upload(req, res, function (err) {
      if (err) return j(err);
      if (req.file && req.file.filename) return r(req.file.filename);
      return r();
    });
  });
};
