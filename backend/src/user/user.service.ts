import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

export interface UserWithoutPassword {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const { email, password, name } = createUserDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email уже зарегистрирован');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  }

  async delete(id: number): Promise<{ message: string }> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Пользователь успешно удален' };
  }
}
