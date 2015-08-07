import config from '../config'

var url = {
  tokenURL: (qs) => {
    var url = config.tokenURL + '?' + qs;
    return url;
  },
  createChatURL: (token) => {
    var url = config.createChatURL + '?access_token=' + token;
    return url;
  },
  chatURL: (token) => {
    var url = config.chatURL + '?access_token=' + token;
    return url;
  },
  mediaURL: (token, type) => {
    var url = config.mediaURL + '?access_token=' + token + '&type=' + type;
    return url;
  },
  getChatURL: (token, chatid) => {
    var url = config.getChatURL + '?access_token=' + token + '&chatid=' + chatid;
    return url;
  },
  updateChatURL: (token) => {
    var url = config.updateChatURL + '?access_token=' + token;
    return url;
  },
  quitChatURL: (token) => {
    var url = config.quitChatURL + '?access_token=' + token;
    return url;
  },
  clearChatURL: (token) => {
    var url = config.clearChatURL + '?access_token=' + token;
    return url;
  },
  muteChatURL: (token) => {
    var url = config.muteChatURL + '?access_token=' + token;
    return url;
  },
  createDepartmentURL: (token) => {
    var url = config.createDepartmentURL + '?access_token=' + token;
    return url;
  },
  updateDepartmentURL: (token) => {
    var url = config.updateDepartmentURL + '?access_token=' + token;
    return url;
  },
  deleteDepartmentURL: (token, id) => {
    var url = config.deleteDepartmentURL + '?access_token=' + token + '&id=' + id;
    return url;
  },
  getDepartmentURL: (token, id) => {
    var url = config.getDepartmentURL + '?access_token=' + token + '&id=' + id;
    return url;
  }
};


export default url;
