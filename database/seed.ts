require('dotenv').config();
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions, runSeeders } from "typeorm-extension";
import MainSeeder from "./seed/main.seed";
import { UserFactory } from "./factories/user.factory";
import { ActionFactory } from "./factories/action.factory";
import { MedicineFactory } from "./factories/medicine.factory";
import { RoleFactory } from "./factories/role.factory";

const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../src/modules/**/**/*.entity{.ts,.js}'],
    factories: [UserFactory, ActionFactory, MedicineFactory, RoleFactory],
    seeds: [MainSeeder],
}

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true)
    await runSeeders(dataSource);
    process.exit();
})