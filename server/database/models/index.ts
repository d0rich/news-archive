var env       = process.env.NODE_ENV || 'development';
var config    = require('../config.js')[env];

import {Sequelize} from 'sequelize'
import { initModels } from './init-models'

try {
  require('dotenv').config()
} catch (e) {}

let sequelize: Sequelize | undefined

if (config.use_env_variable) {
  // @ts-ignore
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate({ logging: console.log })
  .then(() => {
    console.info(`PostgreSQL ${env} database connected…`)
  })
  .catch((err: any) => console.error(err))

export const db = initModels(sequelize);
