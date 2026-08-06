import { useAppSelector } from "../../hooks/hooks";
import { UserCard } from "../../components/Users/UserCard";
import { useState } from "react";
import { Grid } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import { useGetUsersQuery } from "../../store/userApi";
import { Loader } from "../../components/ui/Loader";

export const Users = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const currentUserId = useAppSelector((state) => state.auth.userId);

  const {
    data,
    isLoading,
    error
  } = useGetUsersQuery({
    skip: (page - 1) * limit,
    limit
  });

  const users = data?.users ?? [];

  const totalPages = Math.ceil(
    (data?.total ?? 0) / limit
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Typography>Error loading users</Typography>;
  }

  console.log(users);

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
          pt: 3,
        }}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={() => setPage(page)}
        />
      </Box>
    </>
  );
};
