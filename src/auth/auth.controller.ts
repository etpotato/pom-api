import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthGetUserRequestDto,
  AuthSignInRequestDto,
  AuthUpdateUserRequestBodyDto,
} from './dto';
import { AuthGuard } from './auth.guard';
import { Roles, RolesGuard } from 'src/roles';
import { Role } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('user/:id')
  public async getUser(@Param('id') id: AuthGetUserRequestDto['id']) {
    return this.authService.getUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  public async signUp(@Body() dto: AuthSignInRequestDto) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signIn(@Body() dto: AuthSignInRequestDto) {
    return this.authService.signIn(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('user/:id')
  public async updateUser(
    @Param('id') id: AuthGetUserRequestDto['id'],
    @Body() data: AuthUpdateUserRequestBodyDto,
  ) {
    return this.authService.updateUser({ ...data, id });
  }
}
