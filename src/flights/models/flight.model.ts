import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table({ tableName: 'flights', timestamps: false })
export class Flight extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  flightNumber: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  departureTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  arrivalTime: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  flightCompany: string;

  @HasMany(() => User)
  users: User[];
}
