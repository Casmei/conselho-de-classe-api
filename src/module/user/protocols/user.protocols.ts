export enum userRoles {
  MANAGER = 'MANAGER',
  TEACHER = 'TEACHER',
}

export enum UserStatus {
  ACTIVE = 'active',
  INVITED = 'invited',
  BLOCKED = 'blocked',
}

export type InvitationExtraData = {
  user_in_instance_type?: userRoles;
  shipping_owner_id?: number;
  teams?: number[];
  user_role?: string;
  invitation_code?: string;
  instance_id?: number;
};
