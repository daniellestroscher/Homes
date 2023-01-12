import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { ITenancy } from "../types/interfaces";
import UnitSchema from "./unit";

const TenancySchema = sequelize.define<Model<ITenancy>>("tenancy", {
  // unitId: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  // },
  tenantOne: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  tenantTwo: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  rent: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignmentOfLease: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  pet: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  documents: {
    type: DataTypes.ABSTRACT,
    allowNull: true,
  }
});

UnitSchema.hasMany(TenancySchema, {onDelete:"CASCADE"})
TenancySchema.hasOne(UnitSchema, {onDelete:"CASCADE"})

export default TenancySchema;
