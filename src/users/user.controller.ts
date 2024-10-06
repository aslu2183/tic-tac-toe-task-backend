import { UsersService } from 'src/users/users.service';
import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';


@Controller('user/v1')
export class UserController {
  constructor(private readonly userService: UsersService) {}

    @Post('move-position')
    async moveCursor(@Body() body:any) {
        try{
            const player = body.player.toLowerCase()
            const board  = body.board
            const { data } = await axios.post(`${process.env.PYTHON_ENGINE_URL}move`,{board,player})
            
            return {
                status : data.status,
                message: "Position Moved",
                nextMove: data.isGameOver === true ? undefined : data.move,
                nextPlayer: player === 'x' ? 'O' : 'X'
            }
        }
        catch (error){
            const message = (error?.response?.statusText ||'Undefined Error')
            console.log("Message ",message)
            throw new BadRequestException("Something went wrong on tic-tac-toe engine")
        }
        
    }
}
