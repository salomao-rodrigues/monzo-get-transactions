import Config from '12factor-config';

const cfg = Config({
  userId: {
    env: 'USER_ID',
    type: 'string',
    default: 'YOUR USER ID HERE'
  },
  accountId: {
    env: 'ACCOUNT_ID',
    type: 'string',
    default: 'YOUR ACCOUNT ID HERE'
  },
  accessToken: {
    env: 'ACCESS_TOKEN',
    type: 'string',
    default: 'YOUR ACCESS TOKEN HERE'
  },
  host: {
    env: 'HOST',
    type: 'string',
    default: 'http://127.0.0.1'
  },
  port: {
    env: 'PORT',
    type: 'integer',
    default: 8080
  }
});

export default cfg;
