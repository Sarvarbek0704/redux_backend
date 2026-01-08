import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../users/models/user.model';

@Table
export class Flight extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column
  flightNumber: string;

  @Column(DataType.DATE)
  departureTime: Date;

  @Column(DataType.DATE)
  arrivalTime: Date;

  @Column
  flightCompany: string;

  @HasMany(() => User)
  users: User[];
}
