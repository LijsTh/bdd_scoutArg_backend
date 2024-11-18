import { Test, TestingModule } from '@nestjs/testing';
import { TeamsPhotosService } from './teams_photos.service';

describe('TeamsPhotosService', () => {
  let service: TeamsPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsPhotosService],
    }).compile();

    service = module.get<TeamsPhotosService>(TeamsPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
