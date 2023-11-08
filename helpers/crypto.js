const crypto = require('crypto');

const SECRET = 'REST-API';

const random = () => crypto.randomBytes(128).toString('base64');
// const random = () => crypto.randomBytes(64).toString('hex');
const authentication = (salt, password) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

const salt = random();
console.log({
  password: authentication(salt, 'quero me encontrar mas não sei onde estou'),
  salt,
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-

// const user = {
//   password: 'f1886ed2fc11c891713339be0f8a9ba2c9f84a40c2c439adcfe53ba65359a84c',
//   salt: 'Lmy/5v3iSrwzeBV3tznruWAle93WBKXZnNkBhNYmpeVYKN4hSwZhEU92pIj0oOA7egXH2RDAfThhIqBr5+BtiTSPyfHlPgWS0LTd3jfyS2bimNoFVzVh8m87qLwiYVuZCLhjrtlabZtRLQ+FZ8MgU0Axg2XA+Nak55ZZjbK+VuE=',
// };

// const login = (salt, password) => {
//   const expectedHash = authentication(salt, password);
//   console.log(expectedHash);
//   console.log(user.password === expectedHash);
// };

// login(user.salt, 'quero me encontrar mas não sei onde estou');
