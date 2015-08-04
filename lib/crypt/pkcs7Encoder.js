"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var blocksize = 32;

var PKCS7Encoder = (function () {
  function PKCS7Encoder() {
    _classCallCheck(this, PKCS7Encoder);
  }

  _createClass(PKCS7Encoder, [{
    key: "encode",

    /**
     * 对需要加密的明文进行填充补位
     * @param  string text 需要进行填充补位的明文
     * @return string      补齐明文字符串
     */
    value: function encode(text) {
      var textlength = text.length;
      //计算需要填充的位数
      var amountToPad = blocksize - textlength % blocksize;
      if (amountToPad === 0) {
        amountToPad = blocksize;
      }
      var result = new Buffer(amountToPad);
      result.fill(amountToPad);

      return Buffer.concat([text, result]);
    }

    /**
     * 对解密后的明文进行补位删除
     * @param  string text 解密后的明文
     * @return string      删除补位后的明文
     */
  }, {
    key: "decode",
    value: function decode(text) {
      var pad = text[text.length - 1];
      if (pad < 1 || pad > blocksize) {
        pad = 0;
      }
      return text.slice(0, text.length - pad);
    }
  }]);

  return PKCS7Encoder;
})();

exports["default"] = new PKCS7Encoder();
module.exports = exports["default"];