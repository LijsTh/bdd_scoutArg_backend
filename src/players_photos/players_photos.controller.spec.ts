import { Test, TestingModule } from '@nestjs/testing';
import { PlayersPhotosController } from './players_photos.controller';
import { PlayersPhotosService } from './players_photos.service';

describe('PlayersPhotosController', () => {
  let controller: PlayersPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersPhotosController],
      providers: [PlayersPhotosService],
    }).compile();

    controller = module.get<PlayersPhotosController>(PlayersPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
