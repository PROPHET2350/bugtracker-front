import { userByProject } from 'src/app/Services/Users/get-users-by-project.service';

export interface Projects {
  id: string;
  name: string;
  users: userByProject[];
}

export interface ProjectToPost {
  id: string;
  name: string;
  users: string[];
}
