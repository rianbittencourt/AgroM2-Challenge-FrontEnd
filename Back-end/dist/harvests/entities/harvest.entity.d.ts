import { User } from '../../users/entities/user.entity';
export declare class Harvest {
    id: string;
    date: Date;
    location: string;
    quantity: number;
    seedType: string;
    fertilizer: string;
    user: User;
}
