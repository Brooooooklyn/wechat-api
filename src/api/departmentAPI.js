import url from '../datatype/url';
import request from 'request';
import Thenjs from 'Thenjs';
import basicAPI from './basicAPI';
import utils from '../datatype/utils';

var postJson = utils.postJson;
var getAccessToken = utils.getAccessToken;
var getResponse = utils.getResponse;

var departmentAPI = {
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
      postJson(posturl, data, (err, body) => {
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
      postJson(posturl, data, (err, body) => {
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
  }

};
