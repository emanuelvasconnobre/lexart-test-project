import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  initialAutoIncrement: "1",
  tableName: "products",
  createdAt: true,
  name: {
    plural: "products",
    singular: "product",
  },
})
export class Product extends Model<Product> {
  @Column({
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
}