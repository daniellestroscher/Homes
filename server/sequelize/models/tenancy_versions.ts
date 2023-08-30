import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { ITenancyVersions } from "../types/interfaces";
import TenancySchema from "./tenant";

const TenancyVersionSchema = sequelize.define<Model<ITenancyVersions>>(
  "tenancy_versions",
  {
    tenancyId: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recordEffectiveDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rent: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    increaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

// //FK on source
// TenancyVersionSchema.belongsTo(TenancySchema, {
//   foreignKey: "tenancyId",
//   targetKey: "tenancyId",
//   onDelete: "CASCADE",
// });

// //FK on target
// TenancySchema.hasMany(TenancyVersionSchema, {
//   foreignKey: "tenancyId",
//   sourceKey: "tenancyId",
//   onDelete: "CASCADE",
// });

export default TenancyVersionSchema;
