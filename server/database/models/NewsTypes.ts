import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { News, NewsId } from './News';

export interface NewsTypesAttributes {
  id: number;
  type: string;
}

export type NewsTypesPk = "id";
export type NewsTypesId = NewsTypes[NewsTypesPk];
export type NewsTypesOptionalAttributes = "id";
export type NewsTypesCreationAttributes = Optional<NewsTypesAttributes, NewsTypesOptionalAttributes>;

export class NewsTypes extends Model<NewsTypesAttributes, NewsTypesCreationAttributes> implements NewsTypesAttributes {
  id!: number;
  type!: string;

  // NewsTypes hasMany News via typeId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof NewsTypes {
    return NewsTypes.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'NewsTypes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "newstypes_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "newstypes_type_uindex",
        unique: true,
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
  }
}
