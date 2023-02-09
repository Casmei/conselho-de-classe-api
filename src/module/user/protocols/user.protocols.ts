export enum userRoles {
  MANAGER = 'MANAGER',
  TEACHER = 'TEACHER',
}

export enum UserStatus {
  ACTIVE = 'active',
  INVITED = 'invited',
  BLOCKED = 'blocked',
}

export type InviteExtraData = {
  userData: {
    role: userRoles;
    email: string;
    subjects?: { id: string }[];
    classes?: { id: string }[];
  };
  status: UserStatus;
};
