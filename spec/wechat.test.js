import basicAPI from '../lib/api/basicAPI';
import msgAPI from '../lib/api/msgAPI';
import chai from 'chai';
import handlerAPI from '../lib/api/handlerAPI';

var expect = chai.expect;

describe('wechat api test', () => {

  it('get access_token should ok', (done) => {
    basicAPI.getAccessToken().then((next, body) => {
      expect(body).to.have.property('access_token');
      expect(body).to.have.property('expires_in');
      done();
    });
  });

  it('create group chat should ok', (done) => {
    msgAPI.createChat('21211212', '测试微信api', 'yinan', ['yinan', 'huaqiao', 'shirejiang'])
    .then((next, resp) => {
      done();
    });
  });

  it('text chat to signle people should ok', (done) => {
    msgAPI.sendMsg('huaqiao', 'yinan', 'text', 'single', 'test chat from mocha unit test, boom(https://m.teambition.com)')
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      done();
    });
  });

  it('text chat to group should ok', (done) => {
    msgAPI.sendMsg('21211212', 'yinan', 'text', 'group', 'mocha test run successfully')
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      done();
    });
  });

  it('update chat info should ok', (done) => {
    var postdata = {
      chatid: '21211212',
      op_user: 'yinan',
      name: 'mocha test run success'
    };
    msgAPI.modifyChat(postdata)
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      done();
    });
  });


  it('get chat info by chat id should ok', (done) => {
    msgAPI.getChat('21211212')
    .then((next, resp) => {
      var chatinfo = resp.chat_info;
      expect(resp.errcode).to.equal(0);
      expect(resp.errmsg).to.equal('ok');
      expect(chatinfo.chatid).to.equal('21211212');
      expect(chatinfo.name).to.equal('mocha test run success');
      expect(chatinfo.owner).to.equal('yinan');
      done();
    });
  });

  it('quit chat should ok', (done) => {
    msgAPI.quitChat('21211212', 'huaqiao')
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      done();
    });
  });

  it('join chat should ok', (done) => {
    var postdata = {
      chatid: '21211212',
      op_user: 'yinan',
      add_user_list: ['huaqiao']
    };
    msgAPI.modifyChat(postdata)
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      done();
    });
  });

  it('clear chat notify should ok', (done) => {
    msgAPI.clearNotify('huaqiao', 'single', 'yinan')
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      done();
    });
  });

  it('mute chat should ok', (done) => {
    var userlist = {
      "user_mute_list": [
        {
          userid: 'hahaha',
          status: 1
        },
        {
          userid: 'yinan',
          status: 0
        }
      ]
    }
    msgAPI.muteChat(userlist)
    .then((next, resp) => {
      var result = JSON.parse(resp);
      expect(result.errcode).to.equal(0);
      expect(result.errmsg).to.equal('ok');
      expect(result.invaliduser).deep.equal(['hahaha']);
      done();
    });
  });

  it('check url verified should ok', () => {
    var signature = '44e853178f2cc691ab8a0350647cf8cbf87c3719';
    var timestamp = '1438842268';
    var nonce = '1027268804';
    var echostr = 'xBxtERFC1FatuLhTSQnz12w/3WJHFd5Ie6Bb3OU3gLeo3gWNlw52Xvp3Mkm3pqlhXEKUNwKCGEYlJQHsMn45+g==';
    echostr = decodeURIComponent(echostr);
    var result = handlerAPI.verifyURL(signature, timestamp, nonce, echostr);
    expect(result[0]).to.equal(0);
    //不同的corpid 结果也不一样
    expect(result[1]).to.be.a('string');
  });

  it('decrypt incoming message should ok', (done) => {
    var xml = '<xml><Encrypt><![CDATA[t952cOSADWTDow35dMX964MNeM1R6W/7Px2AMLj9ecnZAMY1S6UQbAQDbgHxrKpy7MolGH8vBf1xwaLm2CftyUgYP0BPYBHYO+ZBW1SH40kncsQY9lQs2YVkf1KvEi/vCArFrg5sFLHuzzavKYHDzxw9fBXaDsWhdmcQ+vbJtRbyzBw9RemtHuryTw8nUkF5VK9qOpFxmpqT5zP1Yl/i1FW6xxeRowzMR6sjZ3n9GqPhEiGlhKrDdFSTR+hbTD6OrTJuig2HOv41xPLy3v5yio38WEvsAeAQV1v+e6dxiIOVpnhqj7JFjg8jELZNqCwWpl1nBII0LT6KYtynSB6vQ4Uq3oVtx2r5xqnNxgTURmwp+i/0YoZXFXEf5YbAy12CSMhCXgBK5AM1y5N+q3OvCifI4dKSGDyzIm6czzeDMI4P2JwhU4JXZF8lbac7FT9Jt5Ssnl5F14szWy2q/3D9qosa0KdUrwShOESgjlY9Sm5wfu9MaQo1fThh12UxfTiQKBqvS3Rp5+VfCwJtMj4MPFkEzaJcHog7vny/bpJ//GwM5CTsK4oLAuzrsp4dgpuc5ll3MBa2vMjkHemEqX41MEjFxlH7yh4RwlLD1xsLoDfE72g9OQwmXLHCv47YL4km]]></Encrypt><ToUserName>wx80850b023d7c38d9</ToUserName><AgentID>1</AgentID><AgentType>chat</AgentType></xml>';
    var signature = 'd6f343a1cde363747568ea5dd7925b3ffa782464';
    var nonce = '1716459900';
    var timestamp = '1438845094';
    handlerAPI.decryptMsg(signature, timestamp, nonce, xml)
    .then((next, result) => {
      expect(result[0]).to.equal(0);
      expect(result[1]).to.be.a('string');
      done();
    });
  });

});
