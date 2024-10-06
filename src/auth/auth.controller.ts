import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Controller('auth/v1')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  async signUp(@Body() body:any, @Res() res:any){
    
    const insertData = {...body}
    insertData['password'] = await bcrypt.hash(body.password.toString(), 10);
    
    const inserted = await this.userService.createData(insertData);
    if(inserted){
        return res.send({status:true, message:"Successfully created new user"})
    }
    else{
        throw new BadRequestException("Something went wrong");
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = new Types.ObjectId(req.user.userId)
    const user = await this.userService.findById(userId)
    return {user}
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    const userId = new Types.ObjectId(req.user.sub)
    return {
      status : true,
      message: "Successfully Logged Out"
    }
  }
}
