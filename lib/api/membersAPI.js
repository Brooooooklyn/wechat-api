'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datatypeUrl = require('../datatype/url');

var _datatypeUrl2 = _interopRequireDefault(_datatypeUrl);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _Thenjs = require('Thenjs');

var _Thenjs2 = _interopRequireDefault(_Thenjs);

var _basicAPI = require('./basicAPI');

var _basicAPI2 = _interopRequireDefault(_basicAPI);

var _datatypeUtils = require('../datatype/utils');

var _datatypeUtils2 = _interopRequireDefault(_datatypeUtils);

var postJson = _datatypeUtils2['default'].postJson;
var getAccessToken = _datatypeUtils2['default'].getAccessToken;
var getResponse = _datatypeUtils2['default'].getResponse;

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
  createDepartment: function createDepartment(name, parentid, order, id) {
    return (0, _Thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].createDepartmentURL(token);
      var postdata = {
        name: name,
        parentid: parentid,
        order: order,
        id: id
      };
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
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
  updateDepartment: function updateDepartment(name, parentid, order, id) {
    return (0, _Thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].updateDepartmentURL(token);
      var postdata = {
        name: name,
        parentid: parentid,
        order: order,
        id: id
      };
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
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
  deleteDepartment: function deleteDepartment(id) {
    return (0, _Thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var geturl = _datatypeUrl2['default'].deleteDepartmentURL(token, id);
      _request2['default'].get({
        url: geturl,
        json: true
      }, function (err, resp, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, err);
    });
  },

  /**
   * 获取部门信息
   * @param  number id 部门id
   * @return object<Thenjs>
   */
  getDepartment: function getDepartment(id) {
    return (0, _Thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      _request2['default'].get({
        url: _datatypeUrl2['default'].getDepartmentURL(token, id),
        json: true
      }, function (err, resp, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, err);
    });
  }

};

exports['default'] = membersAPI;
module.exports = exports['default'];