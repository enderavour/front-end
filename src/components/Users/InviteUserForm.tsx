import { useGetUsersQuery } from "../../store/userApi";
import { useState } from "react";
import { User } from "../../types/User";
import { useInviteUserMutation } from "../../store/companyApi";
import { Stack, Autocomplete, TextField, Button } from "@mui/material";

interface Props
{
  companyId: number;
};

export const InviteUserForm = ({ companyId }: Props) => {
  const { data } = useGetUsersQuery({ skip: 0, limit: 1000 });

  const [user, setUser] = useState<User | null>(null);

  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const handleInvite = async () => {
    if (!user) return;

    await inviteUser({
      companyId,
      userId: user.id
    }).unwrap();

    setUser(null);
  }

  return (
    <Stack spacing={2}>
      <Autocomplete
        options={data?.users ?? []}
        getOptionLabel={(u) => u.name}
        value={user}
        onChange={(_, value) => setUser(value)}
        renderInput={(params) =>
          <TextField
            {...params}
            label="Invite User"
          />
        }
      />

      <Button
        onClick={handleInvite}
        disabled={isLoading}
      >
        Invite
      </Button>
    </Stack>
  );
};
