import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { User } from '../users/entities/user.entity';
export declare class HarvestsController {
    private readonly harvestsService;
    constructor(harvestsService: HarvestsService);
    create(createHarvestDto: CreateHarvestDto, user: User): Promise<import("./entities/harvest.entity").Harvest>;
    findAll(user: User): Promise<import("./entities/harvest.entity").Harvest[]>;
    findOne(id: string, user: User): Promise<import("./entities/harvest.entity").Harvest>;
    remove(id: string, user: User): Promise<void>;
}
