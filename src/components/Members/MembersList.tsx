import { useGetMembersQuery } from "../../store/companyApi";
import { Stack } from "@mui/material";
import { MemberCard } from "./MemberCard";

interface Props
{
  companyId: number;
  isOwner: boolean;
};

export const MembersList = ({
  companyId, isOwner
}: Props) => {
  const {
    data: members = [],
    isLoading
  } = useGetMembersQuery(companyId);

  if (isLoading) return null;

  return (
    <Stack spacing={2}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          companyId={companyId}
          isOwner={isOwner}
        />
      ))}
    </Stack>
  );
};
