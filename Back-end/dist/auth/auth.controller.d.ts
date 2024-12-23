import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
