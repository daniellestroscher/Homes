import { Association, AssociationError, DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { ITenancy } from "../types/interfaces";
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
    // references: {
    //   model: UnitSchema,
    //   key: "unitId",
    // },
  },
  // tenantOne: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   // references: {
  //   //   model: TenantSchema,
  //   //   key: "tenantId",
  //   // },
  // },
  // tenantTwo: {
  //   type: DataTypes.UUID,
  //   allowNull: true,
  //   // references: {
  //   //   model: TenantSchema,
  //   //   key: "tenantId",
  //   // },
  // },
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
