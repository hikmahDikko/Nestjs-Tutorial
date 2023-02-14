import { 
    Body, 
    Controller, 
    Get, 
    HttpException, 
    HttpStatus, 
    Param, 
    ParseBoolPipe, 
    ParseIntPipe, 
    Post, 
    Query, 
    Req, 
    Res, 
    UseGuards, 
    UsePipes, 
    ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/Data Transfer Object/createUserDTO';
import { AuthGuardGuard } from 'src/users/guard/auth-guard/auth-guard.guard';
import { ValidateUserPipe } from 'src/users/pipes/validate-user/validate-user.pipe';
import { UsersService } from 'src/users/users.service';

@Controller('users')
@UseGuards(AuthGuardGuard)
export class UsersController {
    constructor(private userService : UsersService) {

    }

    @Get()
    getUsers(/**@Query('sortDesc', ParseBoolPipe) sortDesc : boolean*/) {
        return this.userService.fetchUser();
    }

    @Get('posts')
    getUsersPosts() {
        return [{ 
            username : 'Hikmat', 
            email : "hikmah@gmail.com",
            posts : [
                {
                    id : 1,
                    title : 'Post 1'
                },
                {
                    id : 2,
                    title : 'Post 2'
                }
            ]
        }]
    }

    @Post()
    crearUser(@Req() request : Request, @Res() response : Response) {
        console.log(request.body);
        response.send('created');
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    crearUserA(@Body(ValidateUserPipe) userData : CreateUserDTO) {
        console.log(userData);
        return this.userService.createUser(userData)
        
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id : number){
        const user = this.userService.fetchUserById(id);

        if(!user) 
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        return user;
    }

    @Get(':id/:postId')
    getUserByIdAndPostId(@Param('id', ParseIntPipe) id : number, @Param('postId', ParseIntPipe) postId : number) {
        console.log(id, postId);
        return { id, postId };
    }
}
