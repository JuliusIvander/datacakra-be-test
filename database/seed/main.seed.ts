import { User } from "../../src/modules/user/entities/user.entity";
import { Action } from "../../src/modules/medical-record/entities/action.entity";
import { Medicine } from "../../src/modules/medical-record/entities/medicine.entity";
import { Role } from "../../src/modules/user/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // Repository Preparation
    const actionRepository = dataSource.getRepository(Action);
    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);

    // Factory preparation
    const actionFactory = factoryManager.get(Action);
    const medicineFactory = factoryManager.get(Medicine);
    const roleFactory = factoryManager.get(Role);
    const userFactory = factoryManager.get(User);

    // Seeding
    const roles = ['Admin', 'Apoteker', 'Dokter Poli Umum', 'Dokter Poli Gigi dan Mulut'];
    const actions = ['Konsultasi Umum', 'Bedah Ringan', 'Scalling', 'Tambal Gigi'];

    await medicineFactory.saveMany(10);
    
    const roleData = await Promise.all(
        roles.map(async (role) => {
            const data = await roleFactory.make({
                name: role
            });
            return data;
        })
    );
    await roleRepository.save(roleData);
    
    const userData = await Promise.all(
      roleData.map(async (role) => {
        const data = await userFactory.make({
          roleId: role.id
        });
        return data;
      })
    );
    await userRepository.save(userData);

    const actionData = await Promise.all(
        actions.map(async (action) => {
            const data = await actionFactory.make({
                name: action
            });
            return data;
        })
    );
    await actionRepository.save(actionData);

  }
}