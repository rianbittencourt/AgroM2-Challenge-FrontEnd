"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const harvests_controller_1 = require("./harvests.controller");
const harvests_service_1 = require("./harvests.service");
describe('HarvestsController', () => {
    let controller;
    let service;
    const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        harvests: [],
    };
    const mockHarvestsService = {
        create: jest.fn(),
        findAll: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [harvests_controller_1.HarvestsController],
            providers: [
                {
                    provide: harvests_service_1.HarvestsService,
                    useValue: mockHarvestsService,
                },
            ],
        }).compile();
        controller = module.get(harvests_controller_1.HarvestsController);
        service = module.get(harvests_service_1.HarvestsService);
    });
    it('should create a harvest', async () => {
        const dto = {
            date: new Date(),
            location: 'Test Location',
            quantity: 100,
            seedType: 'Test Seed',
            fertilizer: 'Test Fertilizer',
        };
        mockHarvestsService.create.mockResolvedValue({ ...dto, id: '1', user: mockUser });
        const result = await controller.create(dto, mockUser);
        expect(result).toHaveProperty('id');
        expect(service.create).toHaveBeenCalledWith(dto, mockUser);
    });
});
//# sourceMappingURL=harvests.controller.spec.js.map