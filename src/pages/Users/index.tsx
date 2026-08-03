import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUsers } from "../../store/userSlice";
import { UserCard } from "../../components/Users/UserCard";
import { useState } from "react";
import { Grid } from "@mui/system";
import { PagePagination } from "../../components/Pagination";
import { Box } from "@mui/material";

const Users = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { users, total, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({
      skip: (page - 1) * limit,
      limit
    }));
  }, [dispatch, page, limit]);

  const totalPages = Math.ceil(total / limit);

  const { t } = useTranslation();

  const currentUserId = useAppSelector(
      (state) => state.auth.userId
  );

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

  return (
    <>
      <Grid container spacing={3}>
        {users.map((user) => (
            <Grid
              key={user.id}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <UserCard
                user={user}
                currentUserId={currentUserId}
              />
            </Grid>
          ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <PagePagination
          page={page}
          totalPages={totalPages}
          onChange={() => setPage(page)}
        />
      </Box>
    </>
  );
};
