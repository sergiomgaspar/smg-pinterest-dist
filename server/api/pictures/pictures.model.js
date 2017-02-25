'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PicturesSchema = new _mongoose2.default.Schema({
  userId: String,
  userName: String,
  imageUrl: String,
  imageComment: String,
  countLike: Number,
  likes: []
});

/* Search pictures by ID of owner */
PicturesSchema.methods.findByUser = function (cb) {
  return this.model('Pictures').find({ userId: this.userId }, cb);
};

exports.default = _mongoose2.default.model('Pictures', PicturesSchema);
//# sourceMappingURL=pictures.model.js.map
