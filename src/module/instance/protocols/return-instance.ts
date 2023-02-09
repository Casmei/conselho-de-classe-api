import { userRoles } from 'src/module/user/protocols/user.protocols';

export interface instanceWithUser {
  id: number;
  name: number;
  userToInstance: UserToInstanceType[];
}

type UserToInstanceType = {
  subscription_instance: Date;
  user: {
    id: string;
    name: string;
    email: string;
    role: userRoles;
  };
};
