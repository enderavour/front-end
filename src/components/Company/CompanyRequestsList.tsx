import { Stack } from "@mui/material";
import { CompanyRequestCard } from "./CompanyRequestCard";
import { useGetCompanyRequestsQuery } from "../../store/companyApi";

interface Props {
  companyId: number;
}

export const CompanyRequestsList = ({ companyId }: Props) => {
  const {
    data: requests = [],
    isLoading,
  } = useGetCompanyRequestsQuery(companyId);

  if (isLoading) {
    return null;
  }

  return (
    <Stack spacing={2}>
      {requests.map((request) => (
        <CompanyRequestCard
          key={request.id}
          request={request}
        />
      ))}
    </Stack>
  );
};
