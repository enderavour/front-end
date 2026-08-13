import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { Company } from "../../types/Company";
import { useTranslation } from "react-i18next";
import { RoutePaths } from "../../routes/routes";
import { useCreateJoinRequestMutation } from "../../store/companyApi";

interface CompanyCardProps
{
  company: Company;
  currentUserId: number | null;

  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
};

export const CompanyCard = ({
  company,
  currentUserId,
  onEdit,
  onDelete
}: CompanyCardProps) => {
  const { t } = useTranslation();

  const [createRequest, { isLoading }] = useCreateJoinRequestMutation();

  const handleJoin = async (companyId: number) => {
    try {
      await createRequest(companyId).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          sx={{
            spacing: 2,
            alignItems: "center"
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
            }}
          >
            {company.name[0].toUpperCase()}
          </Avatar>

          <Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: 600 }}
            >
              {company.name}
            </Typography>

            <Chip
              label={
                company.is_visible
                  ? t("company_visibility.public")
                  : t("company_visibility.private")
              }
              size="small"
            />

          </Box>

        </Stack>

        <Box sx={{ pt: 2 }}>
          <Typography
            color="text.secondary"
          >
            {company.description || t("company_card.nodesc")}
          </Typography>
        </Box>

      </CardContent>

      <CardActions>

        <Button
          component={Link}
          to={RoutePaths.company(company.id)}
          variant="outlined"
        >
          {t("company_card.view")}
        </Button>

        {currentUserId === company.owner_id && (
          <>
            <Button
              onClick={() => onEdit(company)}
            >
              {t("company_card.edit")}
            </Button>

            <Button
              color="error"
              onClick={() => onDelete(company)}
            >
              {t("company_card.delete")}
            </Button>
          </>
        )}

      </CardActions>

    </Card>
  );
};
