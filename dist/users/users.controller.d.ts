import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithoutPassword } from './entities/user-without-password.entity';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    testInsert(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<void>;
    findById(id: string): Promise<UserWithoutPassword>;
}
