import { Role } from "../../src/modules/user/entities/role.entity";
import { setSeederFactory } from "typeorm-extension";

export const RoleFactory = setSeederFactory(Role, (): Role => {
    return new Role();
})