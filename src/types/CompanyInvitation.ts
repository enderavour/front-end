import { User } from "./User";

export interface CompanyInvitation
{
  id: number;
  company_id: number;
  sender_id: number;
  receiver_id: number;
  status: string;
  receiver: User;
};
