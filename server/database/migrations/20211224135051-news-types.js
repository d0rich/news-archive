'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NewsTypes', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(200),
        allowNull: false
      }
    })

    await queryInterface.addColumn('News', 'typeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'NewsTypes',
        key: 'id'
      }
    })

    await queryInterface.addIndex('NewsTypes', {
      name: "newstypes_pk",
      unique: true,
      fields: [
        { name: "id" },
      ]
    })

    await queryInterface.addIndex('NewsTypes', {
      name: "newstypes_type_uindex",
      unique: true,
      fields: [
        { name: "type" },
      ]
    })


  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('News', 'typeId');
    await queryInterface.dropTable('NewsTypes');
  }
};
