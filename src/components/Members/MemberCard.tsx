import { CompanyMember } from "../../types/CompanyMember";
import { useExcludeMemberMutation } from "../../store/companyApi";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useAppointAdminMutation, useRemoveAdminMutation } from "../../store/companyApi";
import { useState } from "react";
import { AdminActionModal } from "../Company/AdminActionModal";

interface Props
{
  member: CompanyMember;
  companyId: number;
  isOwner: boolean;
};

export const MemberCard = ({
  member, companyId, isOwner
}: Props) => {
  const [excludeMember, { isLoading }] = useExcludeMemberMutation();
  const [appointAdmin, { isLoading: isAppointing }] = useAppointAdminMutation();
  const [removeAdmin, { isLoading: isRemoving }] = useRemoveAdminMutation();
  const isAdmin = member.role === "admin";
  const [modalOpen, setModalOpen] = useState(false);

  const handleRoleChange = async () => {
    try {
      if (isAdmin) {
        await removeAdmin({
          companyId,
          userId: member.user_id
        }).unwrap()
      } else {
        await appointAdmin({
          companyId,
          userId: member.user_id
        }).unwrap();
        setModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExclude = async () => {
    try {
      await excludeMember({
        companyId: member.company_id,
        userId: member.user_id
      }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography>
          Member #{member.user_id}
        </Typography>

        <Button color="error"
          onClick={handleExclude}
          disabled={isLoading}
        >
          {isLoading ? "Excluding..." : "Exclude"}
        </Button>

        {isOwner &&
          <>
            <Button
              onClick={() => setModalOpen(true)}
            >
              {isAdmin ? "Remove admin" : "Make admin"}
            </Button>

            <AdminActionModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              isAdmin={isAdmin}
              onConfirm={handleRoleChange}
              isLoading={isAppointing || isRemoving}
            />
          </>
        }
      </CardContent>
    </Card>
  );
};
