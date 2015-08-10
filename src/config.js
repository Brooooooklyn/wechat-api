var config = {
  "tokenURL": "https://qyapi.weixin.qq.com/cgi-bin/gettoken",
  "createChatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/create",
  "chatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/send",
  "getChatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/get",
  "updateChatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/update",
  "quitChatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/quit",
  "clearChatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/clearnotify",
  "muteChatURL": "https://qyapi.weixin.qq.com/cgi-bin/chat/setmute",
  "mediaURL": "https://qyapi.weixin.qq.com/cgi-bin/media/upload",
  "createDepartmentURL": "https://qyapi.weixin.qq.com/cgi-bin/department/create",
  "updateDepartmentURL": "https://qyapi.weixin.qq.com/cgi-bin/department/update",
  "deleteDepartmentURL": "https://qyapi.weixin.qq.com/cgi-bin/department/delete",
  "getDepartmentURL": "https://qyapi.weixin.qq.com/cgi-bin/department/list",
  "createMemberURL": "https://qyapi.weixin.qq.com/cgi-bin/user/create",
  "updateMemberURL": "https://qyapi.weixin.qq.com/cgi-bin/user/update",
  "deleteMemberURL": "https://qyapi.weixin.qq.com/cgi-bin/user/delete",
  "deleteMembersURL": "https://qyapi.weixin.qq.com/cgi-bin/user/batchdelete",
  "getMemberURL": "https://qyapi.weixin.qq.com/cgi-bin/user/get",
  "getUserSimplelistURL": "https://qyapi.weixin.qq.com/cgi-bin/user/simplelist",
  "getUserListURL": "https://qyapi.weixin.qq.com/cgi-bin/user/list",
  "inviteUserURL": "https://qyapi.weixin.qq.com/cgi-bin/invite/send",
  "vaildMsgType": [
    "text",
    "image",
    "file"
  ],
  "vaildChatType": [
    "single",
    "group"
  ]
};

export default config;
