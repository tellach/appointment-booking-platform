// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { Sequelize } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db/mydb.sqlite'
  });
  db
      .authenticate()
      .then(() => {
          console.log('Connection has been established successfully.');
      })
      .catch(err => {
          console.error('Unable to connect to the database:', err);
      });

      module.exports = {db:db};
