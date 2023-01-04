import { DataTypes, Model } from "sequelize";

import { sequelize } from "../database/connection";
import { IUser } from "../types/interfaces";

const UserSchema = sequelize.define<Model<IUser>>("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserSchema;
