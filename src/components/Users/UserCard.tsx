import { User } from "../../types/User";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const UserCard = ({ user }: { user: User }) => {
  return (
    <Link to={`/users/${user.id}`}>
      <Typography>{user.username}</Typography>
      <Typography>{user.email}</Typography>
    </Link>
  );
};

export { UserCard };
