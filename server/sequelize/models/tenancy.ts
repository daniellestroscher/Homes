import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { ITenancy } from "../types/interfaces";
import TenancyVersionSchema from "./tenancy_versions";
import TenantSchema from "./tenant";
import UnitSchema from "./unit";

const TenancySchema = sequelize.define<Model<ITenancy>>("tenancy", {
  tenancyId: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  unitId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  establishedDate: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "NOW()",
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
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  activeStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  previousTenancy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

//FK on source
TenantSchema.belongsTo(TenancySchema, {
  foreignKey: "tenancyId",
  targetKey: "tenancyId",
  onDelete: "CASCADE",
});
//FK on target
TenancySchema.hasMany(TenantSchema, {
  foreignKey: "tenancyId",
  sourceKey: "tenancyId",
  onDelete: "CASCADE",
});

//FK on source
TenancyVersionSchema.belongsTo(TenancySchema, {
  foreignKey: "tenancyId",
  targetKey: "tenancyId",
  onDelete: "CASCADE",
});

//FK on target
TenancySchema.hasMany(TenancyVersionSchema, {
  foreignKey: "tenancyId",
  sourceKey: "tenancyId",
  onDelete: "CASCADE",
});

//FK on source
TenancySchema.belongsTo(UnitSchema, {
  foreignKey: "unitId",
  onDelete: "CASCADE",
});

//FK on target
UnitSchema.hasMany(TenancySchema, {
  foreignKey: "unitId",
  onDelete: "CASCADE",
});

export default TenancySchema;
