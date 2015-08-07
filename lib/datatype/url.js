'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var url = {
  tokenURL: function tokenURL(qs) {
    var url = _config2['default'].tokenURL + '?' + qs;
    return url;
  },
  createChatURL: function createChatURL(token) {
    var url = _config2['default'].createChatURL + '?access_token=' + token;
    return url;
  },
  chatURL: function chatURL(token) {
    var url = _config2['default'].chatURL + '?access_token=' + token;
    return url;
  },
  mediaURL: function mediaURL(token, type) {
    var url = _config2['default'].mediaURL + '?access_token=' + token + '&type=' + type;
    return url;
  },
  getChatURL: function getChatURL(token, chatid) {
    var url = _config2['default'].getChatURL + '?access_token=' + token + '&chatid=' + chatid;
    return url;
  },
  updateChatURL: function updateChatURL(token) {
    var url = _config2['default'].updateChatURL + '?access_token=' + token;
    return url;
  },
  quitChatURL: function quitChatURL(token) {
    var url = _config2['default'].quitChatURL + '?access_token=' + token;
    return url;
  },
  clearChatURL: function clearChatURL(token) {
    var url = _config2['default'].clearChatURL + '?access_token=' + token;
    return url;
  },
  muteChatURL: function muteChatURL(token) {
    var url = _config2['default'].muteChatURL + '?access_token=' + token;
    return url;
  },
  createDepartmentURL: function createDepartmentURL(token) {
    var url = _config2['default'].createDepartmentURL + '?access_token=' + token;
    return url;
  },
  updateDepartmentURL: function updateDepartmentURL(token) {
    var url = _config2['default'].updateDepartmentURL + '?access_token=' + token;
    return url;
  },
  deleteDepartmentURL: function deleteDepartmentURL(token, id) {
    var url = _config2['default'].deleteDepartmentURL + '?access_token=' + token + '&id=' + id;
    return url;
  },
  getDepartmentURL: function getDepartmentURL(token, id) {
    var url = _config2['default'].getDepartmentURL + '?access_token=' + token + '&id=' + id;
    return url;
  }
};

exports['default'] = url;
module.exports = exports['default'];