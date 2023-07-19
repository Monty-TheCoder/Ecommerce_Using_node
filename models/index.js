'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const { serialize } = require('v8');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.products = require('./products')(sequelize, DataTypes);
db.order = require('./order')(sequelize, DataTypes);
db.orderitems = require('./orderitems')(sequelize, DataTypes);
db.user = require('./user')(sequelize, DataTypes);
db.cart = require('./cart')(sequelize, DataTypes);
db.wishlist = require('./wishlist')(sequelize, DataTypes);
db.address = require('./address')(sequelize, DataTypes);
db.roles = require('./roles')(sequelize, DataTypes);
db.userrole = require('./userrole')(sequelize, DataTypes);
module.exports = db;
