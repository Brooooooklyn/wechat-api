'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var url = {
  tokenURL: function tokenURL(qs) {
    var url = _config2['default'].ENTERPRISE_WECHAT.tokenURL + '?' + qs;
    return url;
  },
  createChatURL: function createChatURL(token) {
    var url = _config2['default'].ENTERPRISE_WECHAT.createChatURL + '?access_token=' + token;
    return url;
  },
  chatURL: function chatURL(token) {
    var url = _config2['default'].ENTERPRISE_WECHAT.chatURL + '?access_token=' + token;
    return url;
  },
  mediaURL: function mediaURL(token, type) {
    var url = _config2['default'].ENTERPRISE_WECHAT.mediaURL + '?access_token=' + token + '&type=' + type;
    return url;
  },
  getChatURL: function getChatURL(token, chatid) {
    var url = _config2['default'].ENTERPRISE_WECHAT.getChatURL + '?access_token=' + token + '&chatid=' + chatid;
    return url;
  }
};

exports['default'] = url;
module.exports = exports['default'];