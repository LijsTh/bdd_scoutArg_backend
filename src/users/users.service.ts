import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dtos';

@Injectable()
export class UsersService {
  async getUserById(id: string): Promise<any> {
    // Query a database or something
    // Hardocdes user
    return {
      id: id,
      name: 'John Doe',
      email: 'theolus9999@gmail.com',
      password: 'password',
    };
  }

  async registerUser(body: CreateUserDto) {
    // Query a database or something
    const user = {
      id: '1',
      name: body.name,
      email: body.email,
      password: body.password,
    };

    return user;
  }

  async deleteUser(id: string): Promise<any> {
    return id;
    // Query a database or something
  }
}
