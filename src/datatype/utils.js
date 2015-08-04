import request from 'request';

var utils = {
  postJson: (url, postdata, callback) => {
    return request.post({
      url: url,
      body: JSON.stringify(postdata),
      headers: {
        'content-type': 'application/json'
      },
    },
    (err, resp, body) => {
      callback(err, body);
    })
  }
};

export default utils;
