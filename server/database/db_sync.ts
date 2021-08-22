import { initModels } from './models/init-models'

const { Sequelize } = require('sequelize')

export const initDb = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    require('./sequelize_options.json'))

  sequelize.sync({ force: false, alter: false })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('PostgreSQL connected…')
    })
    // eslint-disable-next-line no-console
    .catch((err: any) => console.error(err))

  return initModels(sequelize)
}
