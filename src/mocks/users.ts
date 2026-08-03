import { Company, companies } from "./companies";

export interface User {
  id: number;
  name: string;
  company: Company;
  email: string;
  about?: string;
  avatar?: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    company: companies[0],
    email: "john@gmail.com",
    about: "Software developer",
    avatar: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    company: companies[1],
    email: "jane@gmail.com",
    about: "Frontend developer",
    avatar: "",

  },
];
