import { useState } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";

import { useGetUsersQuery } from "../../store/userApi";
import { useInviteUserMutation } from "../../store/companyApi";
import { User } from "../../types/User";
import { AppModal } from "../ui/AppModal";
import { Alert } from "@mui/material";

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  companyId: number;
}

export const InviteUserModal = ({
  open,
  onClose,
  companyId,
}: InviteUserModalProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    isLoading: isLoadingUsers,
  } = useGetUsersQuery({
    skip: 0,
    limit: 10,
  });

  const [inviteUser, { isLoading: isInviting }] =
    useInviteUserMutation();

  const handleInvite = async () => {
    if (!selectedUser) return;

    setError(null);

    try {
      await inviteUser({
        companyId,
        userId: selectedUser.id,
      }).unwrap();

      setSelectedUser(null);
      onClose();
    } catch (e: any) {
      setError(e?.data?.detail ?? "Failed to invite user");
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Invite user"
    >
      <Stack spacing={2}>
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <Autocomplete
          options={data?.users ?? []}
          getOptionLabel={(user) => user.name}
          value={selectedUser}
          onChange={(_, value) => setSelectedUser(value)}
          loading={isLoadingUsers}
          disabled={isInviting}
          renderInput={(params) => (
            <TextField
              {...params}
              label="User"
            />
          )}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleInvite}
            disabled={!selectedUser || isInviting}
          >
            {isInviting ? "Inviting..." : "Invite"}
          </Button>

          <Button
            onClick={onClose}
            disabled={isInviting}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </AppModal>
  );
};
