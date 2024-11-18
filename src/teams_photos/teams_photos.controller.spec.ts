import { Test, TestingModule } from '@nestjs/testing';
import { TeamsPhotosController } from './teams_photos.controller';
import { TeamsPhotosService } from './teams_photos.service';

describe('TeamsPhotosController', () => {
  let controller: TeamsPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsPhotosController],
      providers: [TeamsPhotosService],
    }).compile();

    controller = module.get<TeamsPhotosController>(TeamsPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
