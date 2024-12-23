import { Harvest } from '../../harvests/entities/harvest.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    harvests: Harvest[];
}
