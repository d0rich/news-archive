import type { Sequelize } from "sequelize";
import { Editions as _Editions } from "./Editions";
import type { EditionsAttributes, EditionsCreationAttributes } from "./Editions";
import { News as _News } from "./News";
import type { NewsAttributes, NewsCreationAttributes } from "./News";
import { NewsTypes as _NewsTypes } from "./NewsTypes";
import type { NewsTypesAttributes, NewsTypesCreationAttributes } from "./NewsTypes";

export {
  _Editions as Editions,
  _News as News,
  _NewsTypes as NewsTypes,
};

export type {
  EditionsAttributes,
  EditionsCreationAttributes,
  NewsAttributes,
  NewsCreationAttributes,
  NewsTypesAttributes,
  NewsTypesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Editions = _Editions.initModel(sequelize);
  const News = _News.initModel(sequelize);
  const NewsTypes = _NewsTypes.initModel(sequelize);

  News.belongsTo(Editions, { as: "edition", foreignKey: "editionId"});
  Editions.hasMany(News, { as: "Newss", foreignKey: "editionId"});
  News.belongsTo(NewsTypes, { as: "type", foreignKey: "typeId"});
  NewsTypes.hasMany(News, { as: "Newss", foreignKey: "typeId"});

  return {
    Editions: Editions,
    News: News,
    NewsTypes: NewsTypes,
  };
}
