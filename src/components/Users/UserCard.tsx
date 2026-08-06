import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { User } from "../../types/User";
import { AppModal } from "../ui/AppModal";
import { useDeleteUserMutation } from "../../store/userApi";

interface UserCardProps {
  user: User;
  currentUserId: number | null;
}

export const UserCard = ({
  user,
  currentUserId,
}: UserCardProps) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(user.id).unwrap();
      setOpenDelete(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          transition: ".2s",
          mb: 3,
          "&:hover": {
            boxShadow: 8,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >

            <Avatar
              src={user.avatar ?? undefined}
              sx={{
                width: 70,
                height: 70,
                fontSize: 28,
              }}
            >
              {user.name[0].toUpperCase()}
            </Avatar>

            <Box sx={{ flex: 1 }}>

              <Typography
                variant="h6"
                sx={{ fontWeight: 600 }}
              >
                {user.name}
              </Typography>

              <Typography color="text.secondary">
                {user.email}
              </Typography>

              {user.about && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {user.about}
                </Typography>
              )}

            </Box>

          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3 }}
          >

            <Button
              variant="contained"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              {currentUserId === user.id
                ? t("userProfile.edit")
                : t("userProfile.view")}
            </Button>

            {currentUserId === user.id && (
              <Button
                color="error"
                variant="contained"
                onClick={() => setOpenDelete(true)}
                disabled={isLoading}
              >
                {isLoading
                  ? t("common.deleting")
                  : t("userProfile.delete")}
              </Button>
            )}

          </Stack>

        </CardContent>
      </Card>

      <AppModal
        open={openDelete}
        title=""
        onClose={isLoading ? () => {} : () => setOpenDelete(false)}
      >
        <Typography variant="h6">
          {t("delete.del_prof")}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading
              ? t("common.deleting")
              : t("delete.del")}
          </Button>

          <Button
            onClick={() => setOpenDelete(false)}
            disabled={isLoading}
          >
            {t("delete.can")}
          </Button>
        </Stack>
      </AppModal>
    </>
  );
};
