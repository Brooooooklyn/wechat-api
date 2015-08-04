import config from './config';
import chai from 'chai';
import WxCrypt from '../lib/crypt/WxCrypt';
import pkcs7Encoder from '../lib/crypt/pkcs7Encoder';

var expect = chai.expect;

describe('test for lib/WxCrypt', () => {
  it('should not passing', () => {
    expect(() => { new WxCrypt(); }).to.throw('Illegal constructor arguments.');
    expect(() => { new WxCrypt('corpid'); }).to.throw('Illegal constructor arguments.');
    expect(() => { new WxCrypt('corpid', 'token'); }).to.throw('Illegal constructor arguments.');
    expect(() => { new WxCrypt('corpid', 'token', 'encodingAESKey'); }).to.throw('Illegal encodingAESKey length.');
  });

  it('getSHA1 should ok', () => {
    var cryptor = new WxCrypt(config.corpid, config.token, config.encodingAESKey);
    var signature = cryptor.getSHA1('timestamp', 'nonce', 'encrypt');
    expect(signature[0]).to.equal(0);
    expect(signature[1]).to.equal('f726c6a9b9fb7b1ffe089816a338ff117de26b6e');
  });

  it('encrypt/decrypt should be ok', () => {
    var cryptor = new WxCrypt(config.corpid, config.token, config.encodingAESKey);
    var text = 'fuck';
    var encrypt = cryptor.encrypt(text);
    var decrypt = cryptor.decrypt(encrypt);
    expect(decrypt.message).to.equal(text);
  });

  describe('pkcs7Encoder test', () => {

    it('encode should be ok', () => {
      var buf = new Buffer('text');
      var encoded = pkcs7Encoder.encode(buf);
      expect(encoded.length % 32).to.equal(0);
      expect((encoded[encoded.length - 1] + 4) % 32).to.equal(0);
    });

    it('decode should ok', () => {
      var buf = new Buffer('fuck');
      var encoded = pkcs7Encoder.encode(buf);
      expect(pkcs7Encoder.decode(encoded).toString()).to.equal('fuck');
    });
  });
});
