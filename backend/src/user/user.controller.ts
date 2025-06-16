import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This controller is simple: it just gets the currently logged-in user's profile.
@Controller('api/users')
export class UserController {
  @UseGuards(AuthGuard('jwt')) // This protects the route
  @Get('me')
  getMe(@Req() req) {
    // req.user is populated by the JwtStrategy's validate method
    return req.user;
  }
}