import url from '../datatype/url'
import config from 'config';
import request from 'request';
import Thenjs from 'thenjs';
import basicAPI from './basicAPI';


/**
 * @todo 等待与striker协商
 */

var mediaAPI = {
  postMedia: (type, media) => {
    var postUrl;
    var postdata;
    return Thenjs((next) => {
      basicAPI.getAccessToken()
      .then((next2, resp) => {
        let token = resp.access_token;
        postUrl = url.mediaURL(token, type);
        return cont();
      })
    })
    .then((next) => {
      request.post({
        url: postUrl,
        headers: {
          'content-type': 'multipart/form-data;'
        },
        body: postdata
      })
    })
    .fail((next, err) => {
      return cont(null, err);
    });
  }
};

export default mediaAPI;
