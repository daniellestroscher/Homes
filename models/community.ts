import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "./index";
import { ICommunity } from "../types/interfaces";
import UnitSchema from "./unit";

const CommunitySchema = sequelize.define<Model<ICommunity>>("community", {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.fn("uuid_generate_v4"),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

CommunitySchema.hasMany(UnitSchema, {onDelete: 'CASCADE'});

export default CommunitySchema;
