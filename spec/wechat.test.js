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

});
