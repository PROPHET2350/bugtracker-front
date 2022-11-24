export interface Roles {
  id: string;
  name: string;
}

export const Role: any[string] = { ['1']: 'ADMIN', ['2']: 'USER' };
export const inverseRole: any[string] = {
  ['ROLE_ADMIN']: '1',
  ['ROLE_USER']: '2',
};
