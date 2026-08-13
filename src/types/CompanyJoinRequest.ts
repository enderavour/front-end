import { User } from "./User";

export interface CompanyJoinRequest
{
  id: number;

  company_id: number;
  company_name: string;

  user: User;

  status: "pending" | "accepted" | "rejected";

  created_at: string;
};
