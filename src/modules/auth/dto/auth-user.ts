import { Role } from 'src/modules/user/entities/role.entity';

export class AuthUser {
  user: {
    _id: number;
    name: string;
    role: Role;
  };
}
