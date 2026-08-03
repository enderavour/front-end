import { users } from "../../mocks/users";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { PagePagination } from "../../components/Pagination";

export const Users = () => {
  const [page, setPage] = useState(1);

  const limit = 10;

  const totalPages = Math.ceil(users.length / limit);

  const paginatedUsers = users.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <>
      <Grid container spacing={3}>
        {paginatedUsers.map((user) => (
          <Grid
            key={user.id}
            size={{ xs: 12, md: 6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {user.name}
                </Typography>

                <Typography>
                  {user.email}
                </Typography>

                <Typography color="text.secondary">
                  {user.company.name}
                </Typography>
              </CardContent>
            </Card>
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
          onChange={setPage}
        />
      </Box>
    </>
  );
};
