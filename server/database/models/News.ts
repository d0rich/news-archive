/* eslint-disable */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Editions, EditionsId } from './Editions';

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
}

export type NewsPk = "publicationDate" | "titleUrl" | "editionId";
export type NewsId = News[NewsPk];
export type NewsOptionalAttributes = "publicationDate" | "titleUrl" | "editionId" | "createdAt" | "updatedAt" | "sourceUrl";
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

  // News belongsTo Editions via editionId
  edition!: Editions;
  getEdition!: Sequelize.BelongsToGetAssociationMixin<Editions>;
  setEdition!: Sequelize.BelongsToSetAssociationMixin<Editions, EditionsId>;
  createEdition!: Sequelize.BelongsToCreateAssociationMixin<Editions>;

  static initModel(sequelize: Sequelize.Sequelize): typeof News {
    // @ts-ignore
    News.init({
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
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    html: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sourceUrl: {
      type: DataTypes.STRING,
      allowNull: true
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
          { name: "createdAt", order: "DESC" },
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
  return News;
  }
}
