export interface userGlobalStored {
  id: string;
  username: string;
  roles: Array<string>;
  teams: {
    id: string;
    name: string;
  };
}
