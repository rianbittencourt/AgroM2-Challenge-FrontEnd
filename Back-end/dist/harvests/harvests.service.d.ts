import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { User } from '../users/entities/user.entity';
export declare class HarvestsService {
    private harvestsRepository;
    constructor(harvestsRepository: Repository<Harvest>);
    create(createHarvestDto: CreateHarvestDto, user: User): Promise<Harvest>;
    findAll(user: User): Promise<Harvest[]>;
    findOne(id: string, user: User): Promise<Harvest>;
    remove(id: string, user: User): Promise<void>;
}
