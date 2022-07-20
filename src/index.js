const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env.prod') });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '../.env.dev') });
} else {
  dotenv.config({ path: path.join(__dirname, '../.env.test') });
}

const mysql = require('./loaders/mysql');
const app = require('./loaders/app');

app.set('port', process.env.PORT || 3000);

mysql.connect();

app.listen(app.get('port'), () => {
  console.log(
    `${process.env.NODE_ENV} Server listening ${app.get('port')} port start!`,
  );
});
