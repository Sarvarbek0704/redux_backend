import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight } from './models/flight.model';

@Module({
  imports: [SequelizeModule.forFeature([Flight])],
  controllers: [FlightsController],
  providers: [FlightsService],
  exports: [FlightsService],
})
export class FlightsModule {}
