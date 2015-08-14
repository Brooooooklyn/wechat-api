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
  },
  createMemberURL: function createMemberURL(token) {
    var url = _config2['default'].createMemberURL + '?access_token=' + token;
    return url;
  },
  updateMemberURL: function updateMemberURL(token) {
    var url = _config2['default'].updateMemberURL + '?access_token=' + token;
    return url;
  },
  deleteMemberURL: function deleteMemberURL(token, id) {
    var url = _config2['default'].deleteMemberURL + '?access_token=' + token + '&userid=' + id;
    return url;
  },
  deleteMembersURL: function deleteMembersURL(token) {
    var url = _config2['default'].deleteMembersURL + '?access_token=' + token;
    return url;
  },
  getMemberURL: function getMemberURL(token, id) {
    var url = _config2['default'].getMemberURL + '?access_token=' + token + '&userid=' + id;
    return url;
  },
  getUserSimplelistURL: function getUserSimplelistURL(token, department) {
    var fetchchild = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var status = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    var url = _config2['default'].getUserSimplelistURL + '?access_token=' + token + '&department_id=' + department + '&fetch_child=' + fetchchild + '&status=' + status;
    return url;
  },
  getUserListURL: function getUserListURL(token, department) {
    var fetch_child = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var status = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    var url = _config2['default'].getUserListURL + '?access_token=' + token + '&department_id=' + department + '&fetch_child=' + fetchchild + '&status=' + status;
    return url;
  },
  inviteUserURL: function inviteUserURL(token) {
    var url = _config2['default'].inviteUserURL + '?access_token=' + token;
    return url;
  },
  getLoginInfoURL: function getLoginInfoURL(token) {
    var url = _config2['default'].getAuthURL + '?provider_access_token=' + token;
    return url;
  },
  getPreAuthCodeURL: function getPreAuthCodeURL(token) {
    var url = _config2['default'].getPreAuthCodeURL + '?suite_access_token=' + token;
    return url;
  },
  setSessionInfoURL: function setSessionInfoURL(token) {
    var url = _config2['default'].setSessionInfoURL + '?suite_access_token=' + token;
    return url;
  },
  getPermanentCodeURL: function getPermanentCodeURL(token) {
    var url = _config2['default'].getPermanentCodeURL + '?suite_access_token=' + token;
    return url;
  },
  getAuthInfoURL: function getAuthInfoURL(token) {
    var url = _config2['default'].getAuthInfoURL + '?suite_access_token=' + token;
    return url;
  },
  getAgentURL: function getAgentURL(token) {
    var url = _config2['default'].getAgentURL + '?suite_access_token=' + token;
    return url;
  },
  setAgentURL: function setAgentURL(token) {
    var url = _config2['default'].setAgentURL + '?suite_access_token=' + token;
    return url;
  },
  getCorpTokenURL: function getCorpTokenURL(token) {
    var url = _config2['default'].getCorpTokenURL + '?suite_access_token=' + token;
    return url;
  }
};

exports['default'] = url;
module.exports = exports['default'];