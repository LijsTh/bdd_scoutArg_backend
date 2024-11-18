import { Test, TestingModule } from '@nestjs/testing';
import { UsersPhotosController } from './users_photos.controller';
import { UsersPhotosService } from './users_photos.service';

describe('UsersPhotosController', () => {
  let controller: UsersPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPhotosController],
      providers: [UsersPhotosService],
    }).compile();

    controller = module.get<UsersPhotosController>(UsersPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
