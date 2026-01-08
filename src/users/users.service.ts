import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // CreateUserDto dan object yaratish
    const userData = {
      name: createUserDto.name,
      country: createUserDto.country,
      flightId: createUserDto.flightId || null,
    };
    
    return await this.userModel.create(userData);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      include: ['flight'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      include: ['flight'],
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Yangilash ma'lumotlarini tayyorlash
    const updateData: any = {};
    
    if (updateUserDto.name !== undefined) {
      updateData.name = updateUserDto.name;
    }
    
    if (updateUserDto.country !== undefined) {
      updateData.country = updateUserDto.country;
    }
    
    if (updateUserDto.flightId !== undefined) {
      updateData.flightId = updateUserDto.flightId;
    }
    
    await user.update(updateData);
    
    return user;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    
    await user.destroy();
    
    return { message: `User with ID ${id} has been deleted` };
  }

  async findByFlight(flightId: number): Promise<User[]> {
    return await this.userModel.findAll({
      where: { flightId },
      include: ['flight'],
    });
  }
}