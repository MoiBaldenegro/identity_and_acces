import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserApplicationService } from '../../../core/application/services/userApplicationService';
import { UserDto } from '../../../core/domain/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_APPLICATION_SERVICE')
    private readonly usersApplicationService: UserApplicationService,
  ) {}

  @Post()
  async createUsers(@Body() body: UserDto) {
    try {
      const result = await this.usersApplicationService.registerNewUser(body);
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
