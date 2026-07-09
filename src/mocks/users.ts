export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    company: "FSF"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@gmail.com",
    company: "Mozilla"
  }
]
