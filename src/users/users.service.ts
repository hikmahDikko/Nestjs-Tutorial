import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers = [{ username : 'Hikmat', email : 'hikmat@gmail.com' }];
    fetchUser () {
        return this.fakeUsers;
    }

    createUser (userData : CreateUserType) {
        this.fakeUsers.push(userData);
        return {};
    }

    fetchUserById(id : number) {
        return {id, username : 'yetty', email : "yetty@gmail.com"};
    }
}
