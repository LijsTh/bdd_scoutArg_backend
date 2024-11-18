import { Test, TestingModule } from '@nestjs/testing';
import { PlayersPhotosService } from './players_photos.service';

describe('PlayersPhotosService', () => {
  let service: PlayersPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersPhotosService],
    }).compile();

    service = module.get<PlayersPhotosService>(PlayersPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
