import Express from 'express';
import MonzoApi from 'monzo-api';
import jsonfile from 'jsonfile';

import config from './config';

const TRANSACTIONS_FILE = 'transactions.json';

const { userId, accountId, accessToken, host, port } = config;
const app = Express();
const monzoApi = new MonzoApi(userId, accessToken);

let serverHandler;

monzoApi.redirectUrl = `${ host }:${ port }/monzo-redirect`;

app.get('/', (req, res) => {
  res.send('<a href="/login">Login with Monzo</a>');
});

app.get('/login', (req, res) => {
  res.redirect(monzoApi.authorizationUrl);
});

app.get('/monzo-redirect', (req, res) => {
  const { code, state } = req.query;

  monzoApi.authenticate(code, state)
    .then(() => {
      monzoApi.transactions(accountId)
        .then((transactions) => {
          jsonfile.writeFileSync(TRANSACTIONS_FILE, transactions, { flag: 'w' });

          res.send(`Transactions have been saved to ${ TRANSACTIONS_FILE }`);
          serverHandler.close();
        })
        .catch(console.error);
    })
    .catch(console.error);
});

serverHandler = app.listen(port, function () {
  console.log(`Monzo app listening on ${ host }:${ port } !`);
});
