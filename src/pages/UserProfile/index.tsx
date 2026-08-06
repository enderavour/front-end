import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Box,
  Stack,
  Avatar
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { UserCompanyList } from "../../components/Company/UserCompanyList";

import { useAppSelector } from "../../hooks/hooks";
import { useGetUserCompaniesQuery } from "../../store/companyApi";
import { useUpdateUserMutation, useGetUserByIdQuery, useDeleteUserMutation } from "../../store/userApi";
import { AppModal } from "../../components/ui/AppModal";
import { AddRoutes } from "../../routes/routes";

export const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  const currentUserId = useAppSelector(
    (state) => state.auth.userId
  );

  const [name, setName] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const { data: companies, isLoading: isLoadingCompanies} = useGetUserCompaniesQuery(Number(id), { skip: !id });
  const { data: user, isLoading: isLoadingUsers, error } = useGetUserByIdQuery(Number(id), { skip: !id });
  const [updateUser, { isLoading: isUpdateSaving }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteSaving }] = useDeleteUserMutation();


  useEffect(() => {
    if (user) {
      setName(user.name);
      setAbout(user.about ?? "");
      setAvatar(user.avatar ?? "");
    }
  }, [user]);

  const handleSave = async () => {
      if (!user) return;
      try {
          await updateUser({
              id: user.id,
              data: {
                  name,
                  about,
                  avatar,
              },
          }).unwrap();
      } catch (e) {
          console.error(e);
      }
  };


  const handleDelete = async () => {
    if (!user) return;

    try
    {
      await deleteUser(user.id).unwrap();
      navigate(AddRoutes.USERS);
    } catch (e) {
      console.error(e);
    }
  };


  if (isLoadingUsers) {
    return (
      <Typography>
        {t("users.loading")}
      </Typography>
    );
  }


  if (error || !user) {
    return (
      <Container>
        <Typography variant="h4">
          {t("notfound.user")}
        </Typography>
      </Container>
    );
  }


  return (
    <Container sx={{ pt: 4 }}>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >

        <Stack
          sx={{
            direction: "row",
            spacing: 4,
            alignItems: "center"
          }}
        >

          <Avatar
            src={user.avatar || undefined}
            sx={{
              width: 140,
              height: 140,
              fontSize: 50,
            }}
          >
            {
              user.name
                ?.charAt(0)
                .toUpperCase()
            }
          </Avatar>


          <Box>

            <Typography
              variant="h3"
              sx={{ fontWeight: 700 }}
            >
              {user.name}
            </Typography>


            <Typography
              color="text.secondary"
              sx={{ pt: 1 }}
            >
              {t("registration.email")}: {user.email}
            </Typography>


            {
              user.about && (
                <Typography
                  sx={{ pt: 2 }}
                >
                  {user.about}
                </Typography>
              )
            }

          </Box>

        </Stack>


        {
          currentUserId === user.id && (
            <Stack
              spacing={2}
              sx={{ pt: 4 }}
            >

              <Typography variant="h5">
                {t("userProfile.edit")}
              </Typography>


              <TextField
                label={t("profile.name")}
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />


              <TextField
                label={t("company_card.label_description")}
                multiline
                rows={4}
                value={about}
                onChange={(e) =>
                  setAbout(e.target.value)
                }
              />


              <TextField
                label={t("userProfile.avatar_url")}
                value={avatar}
                onChange={(e) =>
                  setAvatar(e.target.value)
                }
              />


              {
                avatar && (
                  <Avatar
                    src={avatar}
                    sx={{
                      width: 80,
                      height: 80
                    }}
                  />
                )
              }

              <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={isUpdateSaving}
              >
                  {isUpdateSaving
                      ? t("common.saving")
                      : t("profile.save")}
              </Button>

              <Button
                color="error"
                variant="contained"
                onClick={() => setOpenDelete(true)}
              >
                {t("delete.del_prof")}
              </Button>

            </Stack>
          )
        }


      </Paper>

      {isLoadingCompanies ? (
          <Typography>{t("users.loadingCompanies")}</Typography>
      ) : (
          <UserCompanyList companies={companies?.companies ?? []} />
      )}

      <AppModal
        title={t("delete.del_title")}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >

        <Typography>
          {t("delete.del_question")}
        </Typography>


        <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={isDeleteSaving}
        >
            {isDeleteSaving
                ? t("common.deleting")
                : t("delete.del")}
        </Button>


        <Button
          onClick={() => setOpenDelete(false)}
          sx={{
            pt: 2,
            ml: 2
          }}
          disabled={isDeleteSaving}
        >
          {t("delete.can")}
        </Button>

      </AppModal>


    </Container>
  );
};
