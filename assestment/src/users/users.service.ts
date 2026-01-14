import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable() //  attach metadata that declares that this class can be manage by Nest, so we can inject that
// into controller. In services we usually talk with the db and define the logic
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    // name findAll has to match in controllers as well
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      // eslint-disable-next-line prettier/prettier
      if (!rolesArray.length) throw new NotFoundException('User Role Not Found'); //status code 404 Not Found (instead of just a string 'Not Found'
      return rolesArray;
      //return this.users.filter((user) => user.role === role); // users = array above, so it can be filtered
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((users) => users.id === id);
    if (!user) throw new NotFoundException('User Not Found'); //  status code 404 Not Found (instead of just a string 'Not Found')
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id); // [...this.users] is a spread operator, it copy all element of an array so we sort by this new array
    // usersByHighestId sort the user in desc sort
    const newUser = {
      // here we create a new user with the highest id (+1) and all the atributes defined in the user @body
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    }; // now we push the new user on users
    this.users.push(newUser);
    //console.log(this.users);
    return newUser; // return the created user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
