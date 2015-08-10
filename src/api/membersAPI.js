import url from '../datatype/url';
import request from 'request';
import Thenjs from 'Thenjs';
import basicAPI from './basicAPI';
import utils from '../datatype/utils';

var postJson = utils.postJson;
var getAccessToken = utils.getAccessToken;
var getResponse = utils.getResponse;

var membersAPI = {
 /**
  * 创建部门
  * @param  string name     部门名称
  * @param  number parentid 父级部门，根部门id ＝ 1
  * @param  string order    在父级部门的排序，小的在前面
  * @param  string id       部门id，最小为1，不指定时默认生成
  * @return object<Thenjs>
  * @example
  * {
  * 	"errcode": 0,
  * 	"errmsg": "creted",
  * 	"id": 2
  * }
  */
  createDepartment: (name, parentid, order, id) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.createDepartmentURL(token);
      var postdata = {
        name: name,
        parentid: parentid,
        order: order,
        id: id
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },
/**
  * 创建部门
  * @param  string name     部门名称
  * @param  number parentid 父级部门，根部门id ＝ 1
  * @param  string order    在父级部门的排序，小的在前面
  * @param  string id       部门id，最小为1，不指定时默认生成
  * @return object<Thenjs>
  * @example
  * {
  * 	"errcode": 0,
  * 	"errmsg": "creted",
  * 	"id": 2
  * }
  */
  updateDepartment: (name, parentid, order, id) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.updateDepartmentURL(token);
      var postdata = {
        name: name,
        parentid: parentid,
        order: order,
        id: id
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 删除一个部门
  * @param  string id 部门id. 不能删除根部门，不能删除含有子部门，成员的部门
  * @return object<Thenjs>
  * @example
  * {
  * 	"errcode": 0,
  * 	"errmsg": "deleted"
  * }
  */
  deleteDepartment: (id) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var geturl = url.deleteDepartmentURL(token, id);
      request.get({
        url: geturl,
        json: true
      }, (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 获取部门信息
  * @param  number id 部门id
  * @return object<Thenjs>
  */
  getDepartment: (id) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      request.get({
        url: url.getDepartmentURL(token, id),
        json: true
      },
      (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },
/**
 * 创建一个成员
 * @param  object userinfo
 * {
 *   "userid": userid 成员UserID。对应管理端的帐号，企业内必须唯一。长度为1~64个字节
 *   "name": name 成员名称。长度为1~64个字节
 *   "department": department 成员所属部门id列表。注意，每个部门的直属成员上限为1000个
 *   "position": position 职位信息。长度为0~64个字节
 *   "mobile": mobile 手机号码。企业内必须唯一，mobile/weixinid/email三者不能同时为空
 *   "gender": gender 性别。1表示男性，2表示女性
 *   "email": email 邮箱。长度为0~64个字节。企业内必须唯一
 *   "weixinid": weixinid 微信号。企业内必须唯一。（注意：是微信号，不是微信的名字）
 *   "avatar_mediaid": avatar_mediaid 成员头像的mediaid，通过多媒体接口上传图片获得的mediaid
 *   "extattr": extattr 扩展属性。扩展属性需要在WEB管理端创建后才生效，否则忽略未知属性的赋值
 * }
 * {
 *   "userid": "zhangsan",
 *   "name": "张三",
 *   "department": [1, 2],
 *   "position": "产品经理",
 *   "mobile": "15913215421",
 *   "gender": "1",
 *   "email": "zhangsan@gzdev.com",
 *   "weixinid": "zhangsan4dev",
 *   "avatar_mediaid": "2-G6nrLmr5EC3MNb_-zL1dDdzkd0p7cNliYu9V5w7o8K0",
 *   "extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
 *   }
 * @return object<Thenjs>
 * @example
 * {
 *   "errcode": 0,
 *   "errmsg": "created"
 * }
 */
  createMember: (userinfo) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.createMemberURL(token);
      postJson(posturl, userinfo, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 更新成员信息
  * @param  object userinfo 与create member 相同
  * @return object<Thenjs>
  * @example
  * {
  * 	"errcode": 0,
  * 	"errmsg": "updated"
  * }
  */
  updateMember: (userinfo) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.updateMemberURL(token);
      postJson(posturl, userinfo, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 删除一个成员
  * @param  string userid 对应企业通讯录中的userid
  * @return object<Thenjs>
  * @param
  * {
  *   "errcode": 0,
  *   "errmsg": "deleted"
  * }
  */
  deleteMember: (userid) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var geturl = url.deleteMemberURL(token, userid);
      request.get({
        url: geturl,
        json: true
      },
      (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 批量删除成员
  * @param  array useridlist 批量删除的成员列表
  * @return object<Thenjs>
  * @example
  * {
  * 	"errcode": 0,
  * 	"errmsg": "deleted"
  * }
  */
  deleteMembers: (useridlist) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.deleteMembersURL(token);
      var postdata = {
        "useridlist": useridlist
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  *
  * @param  string id 对应企业通讯录中id
  * @return object<Thenjs>
  * @example
  * {
  *   "errcode": 0,
  *   "errmsg": "ok",
  *   "userid": "zhangsan",
  *   "name": "李四",
  *   "department": [1, 2],
  *   "position": "后台工程师",
  *   "mobile": "15913215421",
  *   "gender": "1",
  *   "email": "zhangsan@gzdev.com",
  *   "weixinid": "lisifordev",
  *   "avatar": "http://wx.qlogo.cn/mmopen/aA3WJ6DSZUfinQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0",
  *   "status": 1,
  *   "extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
  * }
  */
  getMember: (id) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var geturl = url.getMemberURL(token, id);
      request.get({
        url: geturl,
        json: true
      },
      (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 获取部门成员
  * @param  number department 部门id
  * @param  number fetchchild 是否递归获取子部门下的成员，1/0
  * @param  number status     0获取全部成员，1获取已关注成员列表，2获取禁用成员列表，4获取未关注成员列表。status可叠加
  * @return object<Thenjs>
  * @example
  * {
  *   "errcode": 0,
  *   "errmsg": "ok",
  *   "userlist": [
  *   	{
  *   		"userid": "zhangsan",
  *   		"name": "张三"
  *   	}
  *   ]
  * }
  */
  getUserSimplelist: (department, fetchchild, status) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var geturl = url.getUserSimplelist(token, department, fetchchild, status);
      request.get({
        url: geturl,
        json: true
      },
      (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

/**
  * 获取部门成员
  * @param  number department 部门id
  * @param  number fetchchild 是否递归获取子部门下的成员，1/0
  * @param  number status     0获取全部成员，1获取已关注成员列表，2获取禁用成员列表，4获取未关注成员列表。status可叠加
  * @return object<Thenjs>
  * @example
  * {
  *   "errcode": 0,
  *   "errmsg": "ok",
  *   "userlist": [
  *   	{
  *   		"userid": "zhangsan",
  *   		"name": "张三",
  *   		"department": [1, 2],
  *   		"position": "后台工程师",
  *   		"mobile": "15913215421",
  *   		"gender": "1",
  *   		"email": "zhangsan@gzdev.com",
  *   		"weixinid": "lisifordev",
  *   		"avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqcnHFlhiafvDwklOpZeXYQQ2icg/0",
  *   		"status": 1,
  *   		"extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
  *   	}
  *   ]
  * }
  */
  getUserList: (department, fetchchild, status) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var geturl = url.getUserListURL(token, department, fetchchild, status);
      request.get({
        url: geturl,
        json: true
      },
      (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 邀请成员关注
  * 认证号优先使用微信推送邀请关注，如果没有weixinid字段则依次对手机号，邮箱绑定的微信进行推送，全部没有匹配则通过邮件邀请关注。
  * 邮箱字段无效则邀请失败。 非认证号只通过邮件邀请关注。邮箱字段无效则邀请失败。 已关注以及被禁用成员不允许发起邀请关注请求。
  * 为避免骚扰成员，企业应遵守以下邀请规则：
  * 每月邀请的总人次不超过成员上限的2倍；每7天对同一个成员只能邀请一次。
  * @param  string userid 企业通讯录中对应的userid
  * @return object<Thenjs>
  * @example
  * {
  *   "errcode": 0,
  *   "errmsg": "ok",
  *   "type": 1  1微信邀请，2邮件邀请
  * }
  */
  inviteUser: (userid) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.inviteUserURL(token);
      var postdata = {
        "userid": userid
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  }

};

export default membersAPI;
