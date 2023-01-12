import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { ITenant } from "../types/interfaces";
import TenancySchema from "./tenancy";

const TenantSchema = sequelize.define<Model<ITenant>>("tenant", {
  tenantId: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});
//TenantSchema.hasOne(TenancySchema, {onDelete: "CASCADE"});
//TenancySchema.hasMany(TenantSchema, {onDelete:"CASCADE"});

export default TenantSchema;
