import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<any> {
        const filter = {
            email: username,
        }
        const user = await this.usersService.findOne(filter);
        if(!user){
            throw new NotFoundException("User not Found");
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid username or password");
        }
        const payload = { userId: user._id, username: user.email };
        return {
          token: await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET}),
          status:true,
          name: user.name,
          role: "Player", 
          message:"Successfully Logged In"
        };
    }
}
