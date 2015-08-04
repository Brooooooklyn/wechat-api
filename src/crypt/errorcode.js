var ErrorCode = (type) => {
  var typedef = {
    'OK': 0,
    'ValidateSignatureError': -40001,
    'ParseXmlError': -40002,
    'ComputeSignatureError': -40003,
    'IllegalAesKey': -40004,
    'ValidateCorpidError': -40005,
    'EncryptAESError': -40006,
    'DecryptAESError': -40007,
    'IllegalBuffer': -40008,
    'EncodeBase64Error': -40009,
    'DecodeBase64Error': -400010,
    'GenReturnXmlError': -400011
  };
  return typedef[type];
}

export default ErrorCode;
