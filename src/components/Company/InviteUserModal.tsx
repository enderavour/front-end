import { useState } from "react";
import { useInviteUserMutation } from "../../store/companyApi";

interface InviteUserModalProps
{
  open: boolean;
  onClose: () => void;
  companyId: number;
}

export const InviteUserModal = ({
  open,
  onClose,
  companyId
}: InviteUserModalProps) => {
  const [userId, setUserId] = useState("");
  const [inviteUser] = useInviteUserMutation();

  const handleInvite = async () => {
    await inviteUser({
      companyId: companyId,
      userId: Number(userId)
    })
  }
};
