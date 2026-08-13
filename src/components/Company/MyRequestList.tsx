import { Stack, Typography } from "@mui/material";
import { useGetMyRequestsQuery } from "../../store/companyApi";
import { UserRequestCard } from "../Users/UserRequestCard";
import { Loader } from "../ui/Loader";

export const MyRequestsList = () => {
  const {
    data: requests = [],
    isLoading,
    error
  } = useGetMyRequestsQuery();

  if (isLoading)
    return <Loader />;

  if (error)
  {
    return (
      <Typography color="error">
        Error loading requests
      </Typography>
    );
  }

  if (requests.length === 0)
  {
    return (
      <Typography color="text.secondary">
        You have no requests.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {requests.map((request) => (
        <UserRequestCard
          key={request.id}
          request={request}
        />
      ))}
    </Stack>
  );
}
