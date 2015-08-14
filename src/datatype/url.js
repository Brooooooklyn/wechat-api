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
  },
  createMemberURL: (token) => {
    var url = config.createMemberURL + '?access_token=' + token;
    return url;
  },
  updateMemberURL: (token) => {
    var url = config.updateMemberURL + '?access_token=' + token;
    return url;
  },
  deleteMemberURL: (token, id) => {
    var url = config.deleteMemberURL + '?access_token=' + token + '&userid=' + id;
    return url;
  },
  deleteMembersURL: (token) => {
    var url = config.deleteMembersURL + '?access_token=' + token;
    return url;
  },
  getMemberURL: (token, id) => {
    var url = config.getMemberURL + '?access_token=' + token + '&userid=' + id;
    return url;
  },
  getUserSimplelistURL: (token, department, fetchchild = 0, status = 0) => {
    var url = config.getUserSimplelistURL + '?access_token=' + token + '&department_id=' + department +
              '&fetch_child=' + fetchchild + '&status=' + status;
    return url;
  },
  getUserListURL: (token, department, fetch_child = 0, status = 0) => {
    var url = config.getUserListURL + '?access_token=' + token + '&department_id=' + department +
              '&fetch_child=' + fetchchild + '&status=' + status;
    return url;
  },
  inviteUserURL: (token) => {
    var url = config.inviteUserURL + '?access_token=' + token;
    return url;
  },
  getLoginInfoURL: (token) => {
    var url = config.getAuthURL + '?provider_access_token=' + token;
    return url;
  },
  getPreAuthCodeURL: (token) => {
    var url = config.getPreAuthCodeURL + '?suite_access_token=' + token;
    return url;
  },
  setSessionInfoURL: (token) => {
    var url = config.setSessionInfoURL + '?suite_access_token=' + token;
    return url;
  },
  getPermanentCodeURL: (token) => {
    var url = config.getPermanentCodeURL + '?suite_access_token=' + token;
    return url;
  },
  getAuthInfoURL: (token) => {
    var url = config.getAuthInfoURL + '?suite_access_token=' + token;
    return url;
  },
  getAgentURL: (token) => {
    var url = config.getAgentURL + '?suite_access_token=' + token;
    return url;
  },
  setAgentURL: (token) => {
    var url = config.setAgentURL + '?suite_access_token=' + token;
    return url;
  },
  getCorpTokenURL: (token) => {
    var url = config.getCorpTokenURL + '?suite_access_token=' + token;
    return url;
  }
};


export default url;
