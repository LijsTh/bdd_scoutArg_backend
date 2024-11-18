import { Test, TestingModule } from '@nestjs/testing';
import { UsersPhotosService } from './users_photos.service';

describe('UsersPhotosService', () => {
  let service: UsersPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPhotosService],
    }).compile();

    service = module.get<UsersPhotosService>(UsersPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
