import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { News, NewsId } from './News';

export interface EditionsAttributes {
  id: number;
  name: string;
  baseUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EditionsPk = "id";
export type EditionsId = Editions[EditionsPk];
export type EditionsOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type EditionsCreationAttributes = Optional<EditionsAttributes, EditionsOptionalAttributes>;

export class Editions extends Model<EditionsAttributes, EditionsCreationAttributes> implements EditionsAttributes {
  id!: number;
  name!: string;
  baseUrl!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Editions hasMany News via editionId
  Newsses!: News[];
  getNewsses!: Sequelize.HasManyGetAssociationsMixin<News>;
  setNewsses!: Sequelize.HasManySetAssociationsMixin<News, NewsId>;
  addNewss!: Sequelize.HasManyAddAssociationMixin<News, NewsId>;
  addNewsses!: Sequelize.HasManyAddAssociationsMixin<News, NewsId>;
  createNewss!: Sequelize.HasManyCreateAssociationMixin<News>;
  removeNewss!: Sequelize.HasManyRemoveAssociationMixin<News, NewsId>;
  removeNewsses!: Sequelize.HasManyRemoveAssociationsMixin<News, NewsId>;
  hasNewss!: Sequelize.HasManyHasAssociationMixin<News, NewsId>;
  hasNewsses!: Sequelize.HasManyHasAssociationsMixin<News, NewsId>;
  countNewsses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Editions {
    // @ts-ignore
    return Editions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    baseUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Editions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "sources_id_uindex",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sources_name_uindex",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "sources_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
