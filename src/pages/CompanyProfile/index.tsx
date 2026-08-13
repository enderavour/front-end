import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetCompanyByIdQuery } from "../../store/companyApi";
import { Loader } from "../../components/ui/Loader";
import { useAppSelector } from "../../hooks/hooks";
import { Button } from "@mui/material";
import { useState } from "react";
import { InvitedUsersList } from "../../components/Users/InviteUsersList";
import { CompanyRequestsList } from "../../components/Company/CompanyRequestsList";
import { InviteUserModal } from "../../components/Company/InviteUserModal";
import { LeaveCompanyModal } from "../../components/Users/LeaveCompanyModal";
import { useGetMembersQuery } from "../../store/companyApi";
import { MembersList } from "../../components/Members/MembersList";
import { CompanyMember } from "../../types/CompanyMember";
import { DeleteCompanyModal } from "../../components/Company/DeleteCompanyModal";
import { AdminsList } from "../../components/Members/AdminsList";

export const CompanyProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [openInvite, setOpenInvite] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const currentUserId = useAppSelector((state) => state.auth.userId);

  const companyId = Number(id);

  const {
    data: company,
    isLoading,
    error,
  } = useGetCompanyByIdQuery(companyId);

  const {
    data: members = []
  } = useGetMembersQuery(companyId);

  const isMember = members.some(
    (member: CompanyMember) => member.user_id === currentUserId
  );

  const isOwner = company?.owner_id === currentUserId;

  if (isLoading) {
    return <Loader />;
  }

  if (error || !company) {
    return (
      <Container sx={{ pt: 4 }}>
        <Typography variant="h4">
          {t("notfound.company")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h3">
        {t("profile.name")}: {company.name}
      </Typography>

      <Typography>
        {t("profile.description")}: {company.description}
      </Typography>

      <Typography>
        {t("profile.visible")}:{" "}
        {company.is_visible
          ? t("company_is_visible.yes")
          : t("company_is_visible.no")}
      </Typography>

      {isOwner ? (
        <>
          <Button onClick={() => setOpenInvite(true)}>
            Invite User
          </Button>

          <InvitedUsersList companyId={company.id} />

          <CompanyRequestsList companyId={company.id} />
        </>
      ) : isMember ? (
        <Button
          color="error"
          variant="contained"
          onClick={() => setOpenLeave(true)}
        >
          Leave company
        </Button>
      ) : null}

      <Typography variant="h5" sx={{ mt: 4 }}>
        Members
      </Typography>

      <MembersList
        companyId={company.id}
        isOwner={isOwner}
      />

      <Typography variant="h5" sx={{ mt: 4 }}>
        Admins
      </Typography>

      <AdminsList
        companyId={company.id}
        isOwner={isOwner}
      />

      {isOwner && (
        <Button
          color="error"
          onClick={() => setOpenDelete(true)}
        >
          Delete Company
        </Button>
      )}

      <InviteUserModal
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        companyId={company.id}
      />

      <LeaveCompanyModal
        open={openLeave}
        onClose={() => setOpenLeave(false)}
        companyId={company.id}
      />

      <DeleteCompanyModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        company={company}
      />
    </Container>
  );
};
