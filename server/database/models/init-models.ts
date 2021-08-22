/* eslint-disable */
import type { Sequelize, Model } from "sequelize";
import { Editions } from "./Editions";
import type { EditionsAttributes, EditionsCreationAttributes } from "./Editions";
import { News } from "./News";
import type { NewsAttributes, NewsCreationAttributes } from "./News";

export {
  Editions,
  News,
};

export type {
  EditionsAttributes,
  EditionsCreationAttributes,
  NewsAttributes,
  NewsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Editions.initModel(sequelize);
  News.initModel(sequelize);

  News.belongsTo(Editions, { as: "edition", foreignKey: "editionId"});
  Editions.hasMany(News, { as: "Newss", foreignKey: "editionId"});

  return {
    Editions: Editions,
    News: News,
  };
}
