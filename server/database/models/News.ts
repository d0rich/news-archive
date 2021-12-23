import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Editions, EditionsId } from './Editions';
import type { NewsTypes, NewsTypesId } from './NewsTypes';

export interface NewsAttributes {
  publicationDate: string;
  titleUrl: string;
  editionId: number;
  title: string;
  content: string;
  html: string;
  createdAt: Date;
  updatedAt: Date;
  sourceUrl?: string;
  locale: string;
  description?: string;
  typeId?: number;
}

export type NewsPk = "publicationDate" | "titleUrl" | "editionId";
export type NewsId = News[NewsPk];
export type NewsOptionalAttributes = "createdAt" | "updatedAt" | "sourceUrl" | "description" | "typeId";
export type NewsCreationAttributes = Optional<NewsAttributes, NewsOptionalAttributes>;

export class News extends Model<NewsAttributes, NewsCreationAttributes> implements NewsAttributes {
  publicationDate!: string;
  titleUrl!: string;
  editionId!: number;
  title!: string;
  content!: string;
  html!: string;
  createdAt!: Date;
  updatedAt!: Date;
  sourceUrl?: string;
  locale!: string;
  description?: string;
  typeId?: number;

  // News belongsTo Editions via editionId
  edition!: Editions;
  getEdition!: Sequelize.BelongsToGetAssociationMixin<Editions>;
  setEdition!: Sequelize.BelongsToSetAssociationMixin<Editions, EditionsId>;
  createEdition!: Sequelize.BelongsToCreateAssociationMixin<Editions>;
  // News belongsTo NewsTypes via typeId
  type!: NewsTypes;
  getType!: Sequelize.BelongsToGetAssociationMixin<NewsTypes>;
  setType!: Sequelize.BelongsToSetAssociationMixin<NewsTypes, NewsTypesId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<NewsTypes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof News {
    // @ts-ignore
    return News.init({
    publicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    titleUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    editionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Editions',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sourceUrl: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    locale: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'NewsTypes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'News',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "news_createdat_index",
        fields: [
          { name: "createdAt" },
        ]
      },
      {
        name: "news_locale_index",
        fields: [
          { name: "locale" },
        ]
      },
      {
        name: "news_pk",
        unique: true,
        fields: [
          { name: "publicationDate" },
          { name: "titleUrl" },
          { name: "editionId" },
        ]
      },
    ]
  });
  }
}
