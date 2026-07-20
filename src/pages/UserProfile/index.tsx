import {
  Container,
  Typography,
  Button,
  TextField
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchUsersById,
  updateUser,
  deleteUser
} from "../../store/userSlice";

import { AppModal } from "../../components/ui/AppModal";

const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [uname, setUname] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  const {
    selectedUser,
    loading,
    error
  } = useAppSelector(
    (state) => state.users
  );

  const currentUserId = useAppSelector(
    (state) => state.auth.userId
  );

  const [username, setUsername] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchUsersById(Number(id)));
    }
  }, [dispatch, id]);


  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setAbout(selectedUser.about ?? "");
      setAvatar(selectedUser.avatar ?? "");
    }
  }, [selectedUser]);


  const handleSave = () => {
    if (!selectedUser) return;

    dispatch(
      updateUser({
        id: selectedUser.id,
        data: {
          username,
          about,
          avatar
        }
      })
    );
  };


  const handleDelete = () => {
    if (!selectedUser) return;

    dispatch(deleteUser(selectedUser.id));

    setOpenDelete(false);

    navigate("/users");
  };


  if (loading) {
    return (
      <Typography>
        {t("users.loading")}
      </Typography>
    );
  }


  if (error || !selectedUser) {
    return (
      <Container>
        <Typography variant="h4">
          {t("notfound.user")}
        </Typography>
      </Container>
    );
  }


  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h3">
        {selectedUser.username}
      </Typography>


      <Typography>
        {t("userprofile.email")}: {selectedUser.email}
      </Typography>


      {currentUserId === selectedUser.id && (
          <>
              <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                  label="About"
                  multiline
                  rows={4}
                  fullWidth
                  value={about}
                  onChange={(e)=>setAbout(e.target.value)}
                  sx={{mt:2}}
              />


              <TextField
                  label="Avatar URL"
                  fullWidth
                  value={avatar}
                  onChange={(e)=>setAvatar(e.target.value)}
                  sx={{mt:2}}
              />

              <Button onClick={handleSave}>
                  {t("userprofile.save")}
              </Button>
          </>
      )}


      {
        currentUserId === selectedUser.id && (
          <Button
            color="error"
            variant="contained"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => setOpenDelete(true)}
          >
            {t("delete.del_prof")}
          </Button>
        )
      }


      <AppModal
        title={t("delete.del_title")}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <Typography variant="h6">
          {t("delete.del_question")}
        </Typography>


        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          sx={{ mt: 2 }}
        >
          {t("delete.del")}
        </Button>


        <Button
          onClick={() => setOpenDelete(false)}
          sx={{ mt: 2, ml: 2 }}
        >
          {t("delete.can")}
        </Button>

      </AppModal>


    </Container>
  );
};


export { UserProfile };
