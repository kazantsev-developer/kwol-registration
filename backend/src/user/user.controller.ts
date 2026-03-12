import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService, UserWithoutPassword } from './user.service';
import { Step1Dto, CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('step1')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async validateStep1(@Body() step1Dto: Step1Dto) {
    const existingUser = await this.userService.findByEmail(step1Dto.email);
    if (existingUser) {
      return {
        valid: false,
        message: 'Email уже зарегистрирован',
      };
    }
    return {
      valid: true,
      message: 'Email доступен',
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<UserWithoutPassword[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.userService.delete(id);
  }
}
