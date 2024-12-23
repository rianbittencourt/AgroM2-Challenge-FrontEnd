"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const harvest_entity_1 = require("./entities/harvest.entity");
let HarvestsService = class HarvestsService {
    constructor(harvestsRepository) {
        this.harvestsRepository = harvestsRepository;
    }
    async create(createHarvestDto, user) {
        const harvest = this.harvestsRepository.create({
            ...createHarvestDto,
            user,
        });
        return this.harvestsRepository.save(harvest);
    }
    async findAll(user) {
        return this.harvestsRepository.find({
            where: { user: { id: user.id } },
        });
    }
    async findOne(id, user) {
        const harvest = await this.harvestsRepository.findOne({
            where: { id, user: { id: user.id } },
        });
        if (!harvest) {
            throw new common_1.NotFoundException(`Harvest with ID ${id} not found`);
        }
        return harvest;
    }
    async remove(id, user) {
        const result = await this.harvestsRepository.delete({
            id,
            user: { id: user.id },
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Harvest with ID ${id} not found`);
        }
    }
};
exports.HarvestsService = HarvestsService;
exports.HarvestsService = HarvestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(harvest_entity_1.Harvest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HarvestsService);
//# sourceMappingURL=harvests.service.js.map