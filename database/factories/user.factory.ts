require('dotenv').config();
import { Faker } from "@faker-js/faker";
import { User } from "../../src/modules/user/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";
import * as bcrypt from "bcrypt";

export const UserFactory = setSeederFactory(User, (faker: Faker): User => {
    const user = new User();
    user.name = faker.person.fullName();
    user.username = faker.internet.userName();
    user.password = bcrypt.hashSync('Jaya-jaya', parseInt(process.env.SALT) || 10);
    return user;
})