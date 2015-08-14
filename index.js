var msgAPI = require('./lib/api/msgAPI');
var mediaAPI = require('./lib/api/mediaAPI');
var handlerAPI = require('./lib/api/handlerAPI');
var membersAPI = require('./lib/api/membersAPI');
var authAPI = require('./lib/api/authAPI');
var suiteAuthAPI = require('./lib/api/suiteAuthAPI');

module.exports = {
  msgAPI: msgAPI,
  mediaAPI: mediaAPI,
  handlerAPI: handlerAPI,
  membersAPI: membersAPI,
  authAPI: authAPI,
  suiteAuthAPI: suiteAuthAPI
};
