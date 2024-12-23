import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        harvests: import("../harvests/entities/harvest.entity").Harvest[];
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            harvests: import("../harvests/entities/harvest.entity").Harvest[];
        };
        access_token: string;
    }>;
    checkCredentials(loginDto: LoginDto): Promise<{
        id: string;
        email: string;
        name: string;
        harvests: import("../harvests/entities/harvest.entity").Harvest[];
    }>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        name: string;
        harvests: import("../harvests/entities/harvest.entity").Harvest[];
    } | null>;
}
