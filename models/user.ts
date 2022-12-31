import { DataTypes, Model } from "sequelize";

import { sequelize } from "./index";
import { IUser } from "../types/interfaces";

const UserSchema = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.fn("uuid_generate_v4"),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
}

export default UserSchema;
