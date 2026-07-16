import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { users } from "../../mocks/users";

const UserProfile = () => {
  const { id } = useParams();

  const user = users.find(
    (user) => user.id === Number(id)
  );

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">
          User not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        {user.name}
      </Typography>

      <Typography>
        Email: {user.email}
      </Typography>

      <Typography>
        Company: {user.company}
      </Typography>
    </Container>
  );
};

export default UserProfile;
