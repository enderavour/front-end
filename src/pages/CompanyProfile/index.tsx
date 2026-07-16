import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { companies } from "../../mocks/companies";

const CompanyProfile = () => {
  const { id } = useParams();

  const company = companies.find(
    (company) => company.id === Number(id)
  );

  if (!company) {
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
        {company.name}
      </Typography>

      <Typography>
        Name: {company.name}
      </Typography>

      <Typography>
        Address: {company.address}
      </Typography>
    </Container>
  );
};

export { CompanyProfile };
