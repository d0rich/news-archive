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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }
    });

    // Indexes
    await queryInterface.addIndex('Editions', {
      name: "sources_id_uindex",
      unique: true,
      fields: [
        { name: "id" },
      ]
    })

    await queryInterface.addIndex('Editions', {
      name: "sources_name_uindex",
      unique: true,
      fields: [
        { name: "name" },
      ]
    })

    await queryInterface.addIndex('Editions', {
      name: "sources_pk",
      unique: true,
      fields: [
        { name: "id" },
      ]
    })

    await queryInterface.addIndex('News', {
      name: "news_createdat_index",
      fields: [
        { name: "createdAt" },
      ]
    })

    await queryInterface.addIndex('News', {
      name: "news_locale_index",
      fields: [
        { name: "locale" },
      ]
    })

    await queryInterface.addIndex('News', {
      name: "news_pk",
      unique: true,
      fields: [
        { name: "publicationDate" },
        { name: "titleUrl" },
        { name: "editionId" },
      ]
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('News');
    await queryInterface.dropTable('Editions');
  }
};
