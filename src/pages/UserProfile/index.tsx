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

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { users } from "../../mocks/users";

import { useAppSelector } from "../../hooks/hooks";

import { AppModal } from "../../components/ui/AppModal";

export const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const selectedUser = users.find(
    (user) => user.id === Number(id)
  );

  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  const currentUserId = useAppSelector(
    (state) => state.auth.userId
  );

  const [username, setUsername] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Container sx={{ mt: 4 }}>

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
            src={selectedUser?.avatar || undefined}
            sx={{
              width: 140,
              height: 140,
              fontSize: 50,
            }}
          >
            {
              selectedUser?.name
                ?.charAt(0)
                .toUpperCase()
            }
          </Avatar>


          <Box>

            <Typography
              variant="h3"
              sx={{ fontWeight: 700 }}
            >
              {selectedUser?.name}
            </Typography>


            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {t("userprofile.email")}: {selectedUser?.email}
            </Typography>


            {
              selectedUser?.about && (
                <Typography
                  sx={{ mt: 2 }}
                >
                  {selectedUser?.about}
                </Typography>
              )
            }

          </Box>

        </Stack>


        {
          currentUserId === selectedUser?.id && (
            <Stack
              spacing={2}
              sx={{ mt: 4 }}
            >

              <Typography variant="h5">
                {t("userprofile.edit")}
              </Typography>


              <TextField
                label="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />


              <TextField
                label="About"
                multiline
                rows={4}
                value={about}
                onChange={(e) =>
                  setAbout(e.target.value)
                }
              />


              <TextField
                label="Avatar URL"
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
                onClick={() => {}}
              >
                {t("userprofile.save")}
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
          onClick={() => {}}
          sx={{ mt: 2 }}
        >
          {t("delete.del")}
        </Button>


        <Button
          onClick={() => setOpenDelete(false)}
          sx={{
            mt: 2,
            ml: 2
          }}
        >
          {t("delete.can")}
        </Button>

      </AppModal>


    </Container>
  );
};
