import {
  Column,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Flight } from '../../flights/models/flight.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ForeignKey(() => Flight)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  flightId: number;

  @BelongsTo(() => Flight)
  flight: Flight;
}
