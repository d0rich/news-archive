'use strict'
// import { DataTypes, Sequelize } from 'sequelize'
// const queryInterface = new Sequelize().getQueryInterface()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Table for editions
    await queryInterface.createTable('Editions', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      baseUrl: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    // Table for news
    await queryInterface.createTable('News', {
      publicationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      titleUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
      },
      editionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Editions',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      html: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sourceUrl: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      locale: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });

    await queryInterface.addConstraint('News', {
      fields: ['editionId'],
      type: 'foreign key',
      name: 'news_editions_id_fk',
      references: {
        table: 'Editions',
        field: 'id'
      }
    })

    // Indexes
    await queryInterface.addIndex('News', {
      name: "news_createdat_index",
      fields: [
        { name: "publicationDate", order: "DESC" },
      ]
    })

    await queryInterface.addIndex('News', {
      name: "news_locale_index",
      fields: [
        { name: "locale" },
      ]
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('News');
    await queryInterface.dropTable('Editions');
  }
};
