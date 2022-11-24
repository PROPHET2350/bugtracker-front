export interface Tickets {
  date: string;
  description: string;
  id: string;
  name: string;
  priority: string;
  project: string;
  state: string;
  type: string;
  user: string;
  users: [
    {
      id: string;
      name: string;
    }
  ];
}
