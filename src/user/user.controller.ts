import {
  Controller,
  Get,
  Post,
  Request,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserWIthoutPassword } from './type/user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  find(): Promise<UserWIthoutPassword[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req): Promise<UserWIthoutPassword> {
    return this.userService.getUser({ id: req.user.userId });
  }
}
