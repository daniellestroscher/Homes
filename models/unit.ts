import { DataTypes, Model } from "sequelize";

import { sequelize } from "../database/connection";
import { IUnit } from "../types/interfaces";

const UnitSchema = sequelize.define<Model<IUnit>>("unit", {
  id: {
    type: DataTypes.UUID,
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
