import config from '../config'

var url = {
  tokenURL: (qs) => {
    let url = config.tokenURL + '?' + qs;
    return url;
  },
  createChatURL: (token) => {
    let url = config.createChatURL + '?access_token=' + token;
    return url;
  },
  chatURL: (token) => {
    let url = config.chatURL + '?access_token=' + token;
    return url;
  },
  mediaURL: (token, type) => {
    let url = config.mediaURL + '?access_token=' + token + '&type=' + type;
    return url;
  },
  getChatURL: (token, chatid) => {
    let url = config.getChatURL + '?access_token=' + token + '&chatid=' + chatid;
    return url;
  },
  updateChatURL: (token) => {
    let url = config.updateChatURL + '?access_token=' + token;
    return url;
  },
  quitChatURL: (token) => {
    let url = config.quitChatURL + '?access_token=' + token;
    return url;
  },
  clearChatURL: (token) => {
    let url = config.clearChatURL + '?access_token=' + token;
    return url;
  },
  muteChatURL: (token) => {
    let url = config.muteChatURL + '?access_token=' + token;
    return url;
  }
};


export default url;
