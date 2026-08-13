import { useGetMembersQuery } from "../../store/companyApi";
import { Stack } from "@mui/material";
import { MemberCard } from "./MemberCard";

interface Props
{
  companyId: number;
  isOwner: boolean;
};

export const AdminsList = ({
  companyId, isOwner
}: Props) => {
  const {
    data: members = [],
    isLoading
  } = useGetMembersQuery(companyId);

  if (isLoading) return null;

  const admins = members.filter((member) => member.role === "admin");

  return (
    <Stack spacing={2}>
      {admins.map((admin) => (
        <MemberCard
          key={admin.id}
          member={admin}
          companyId={companyId}
          isOwner={isOwner}
        />
      ))}
    </Stack>
  );
};
