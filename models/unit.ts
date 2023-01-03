import { DataTypes, Model } from "sequelize";

import { sequelize } from "./index";
import { IUnit } from "../types/interfaces";

const UnitSchema = sequelize.define<Model<IUnit>>("unit", {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.fn("uuid_generate_v4"),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tenantOne: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  tenantTwo: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default UnitSchema;
