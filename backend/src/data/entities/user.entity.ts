import { DataTypes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "users",
  createdAt: true,
  name: {
    plural: "users",
    singular: "user",
  },
})
export class User extends Model<User> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
