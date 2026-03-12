import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class Step1Dto {
  @IsEmail({}, { message: 'Введите корректный корпоративный e-mail' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email!: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Введите корректный корпоративный e-mail' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email!: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  name!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'Пароль должен содержать только латинские буквы и цифры',
  })
  password!: string;
}
