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
  communityId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default UnitSchema;
