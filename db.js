const mysql = require('mysql2');
const envConfig = require('./envConfigurations/EnvConfigurations');

const connection = mysql.createConnection({
  host: envConfig.db.host,
  port: envConfig.db.port,
  user: envConfig.db.user,
  password: envConfig.db.password,
  database: envConfig.db.name
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectarse con la base de datos:', err);
    return;
  }
  console.log('Conectado con la base de datos');
});

module.exports = connection;
