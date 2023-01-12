import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { IUnit } from "../types/interfaces";
import TenancySchema from "./tenancy";

const UnitSchema = sequelize.define<Model<IUnit>>("unit", {
  unitId: {
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

//UnitSchema.hasMany(TenancySchema, {onDelete:"CASCADE"});
//TenancySchema.hasOne(UnitSchema, {onDelete: "CASCADE"});

export default UnitSchema;
