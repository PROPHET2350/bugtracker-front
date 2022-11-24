export interface userCredential {
  token: string;
  user: {
    id: string;
    username: string;
    roles: Array<string>;
    teams: {
      id: string;
      name: string;
    };
  };
}
