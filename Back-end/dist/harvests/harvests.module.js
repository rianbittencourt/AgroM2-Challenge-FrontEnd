"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const harvest_entity_1 = require("./entities/harvest.entity");
const harvests_service_1 = require("./harvests.service");
const harvests_controller_1 = require("./harvests.controller");
let HarvestsModule = class HarvestsModule {
};
exports.HarvestsModule = HarvestsModule;
exports.HarvestsModule = HarvestsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([harvest_entity_1.Harvest])],
        controllers: [harvests_controller_1.HarvestsController],
        providers: [harvests_service_1.HarvestsService],
    })
], HarvestsModule);
//# sourceMappingURL=harvests.module.js.map