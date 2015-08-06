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
    var xml = '<xml><Encrypt><![CDATA[TmFvnzxcnaUqDshlyJrBejsbXq2/WNlkOAnW8kizp2o9CsHG5PGGlm8hOtJTM9E7prHijgE8qQPE/zmXmaxVFoPtlpNiEjbR6aAt+mfSfUKgEiwUmKnPQNVsGLTa7iiMPdBTaRiQa2ij7aV0yMjhU4m5EfwI8Wfyrop9LtUkYZCNUKFayB/L8vqaAhv+WPjsi3saiN3IYZaRu0WOyw4jp7MWq8zwlSoN6GdZfpX148AsyQnlQyMOB+5xGrylbX4thuiF3ynoJ6Xl0SARLPVmGnP9TfGuZFCn6EHRDITIiqWyqQjkDVmy9y16oB4uuUex3IBaZ7uLfCOF1aHRl0NOozhbyCx5SFt46PHqmxwQNWFOG7jFppu/5JhbtHtm67G950huaL0aD+stxNImHarlCDEIsSpuTgR9Vd18lUmNwd1+82K/knG9YvfpKLdKhje7DNCDZXN5H9JKBMSY/M9hKqlA1+hZn0BkgXS4NoMRVy7C8YZQ7UPMfTuB0CpmkWPKmPfsrBzMOgqSPpEhhQMXMiKH9W3eOzbTpuLoBtjCDI3JRauPqOuAweW87pSQGIClCG0PsRmhPHrnyP3k6Ht7K8r+IP0ckYvnfLEl1JuEEBFwo6KKODe03DLbAtuZnooN]]></Encrypt><ToUserName>wx80850b023d7c38d9</ToUserName><AgentID>1</AgentID><AgentType>chat</AgentType></xml>';
    var signature = 'fb66ae72d08ca3571b0251a5f5b02d49e4797a05';
    var nonce = '951136818';
    var timestamp = '1438850706';
    handlerAPI.decryptMsg(signature, timestamp, nonce, xml)
    .then((next, result) => {
      expect(result[0]).to.equal(0);
      expect(result[1]).to.be.a('object');
      done();
    });
  });

});
