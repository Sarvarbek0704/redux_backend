import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flight } from './models/flight.model';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight)
    private readonly flightModel: typeof Flight,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flightData = {
      flightNumber: createFlightDto.flightNumber,
      departureTime: new Date(createFlightDto.departureTime),
      arrivalTime: new Date(createFlightDto.arrivalTime),
      flightCompany: createFlightDto.flightCompany,
    };
    
    return await this.flightModel.create(flightData);
  }

  async findAll(): Promise<Flight[]> {
    return await this.flightModel.findAll({
      include: ['users'],
    });
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightModel.findOne({
      where: { id },
      include: ['users'],
    });
    
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }
    
    return flight;
  }

  async findByFlightNumber(flightNumber: string): Promise<Flight> {
    const flight = await this.flightModel.findOne({
      where: { flightNumber },
      include: ['users'],
    });
    
    if (!flight) {
      throw new NotFoundException(`Flight with number ${flightNumber} not found`);
    }
    
    return flight;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.findOne(id);
    
    const updateData: any = {};
    
    if (updateFlightDto.flightNumber !== undefined) {
      updateData.flightNumber = updateFlightDto.flightNumber;
    }
    
    if (updateFlightDto.departureTime !== undefined) {
      updateData.departureTime = new Date(updateFlightDto.departureTime);
    }
    
    if (updateFlightDto.arrivalTime !== undefined) {
      updateData.arrivalTime = new Date(updateFlightDto.arrivalTime);
    }
    
    if (updateFlightDto.flightCompany !== undefined) {
      updateData.flightCompany = updateFlightDto.flightCompany;
    }
    
    await flight.update(updateData);
    
    return flight;
  }

  async remove(id: number): Promise<{ message: string }> {
    const flight = await this.findOne(id);
    
    await flight.destroy();
    
    return { message: `Flight with ID ${id} has been deleted` };
  }
} 