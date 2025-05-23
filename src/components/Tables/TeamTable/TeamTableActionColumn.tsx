import { EditIcon, Trash2Icon } from "lucide-react";

import { useDeleteTeamModal } from "@/components/Dialogs/DeleteTeamDialog";
import TableActionColumn from "@/components/Tables/TableActionColumn";

const TeamTableActionColumn: React.FC<{
  id: string;
  fileKeys?: string[];
  onEdit: () => void;
}> = ({ id, fileKeys, onEdit }) => {
  const { setShowDeleteTeamModal, DeleteTeamModal } = useDeleteTeamModal({
    id,
    fileKeys,
  });
  const items = [
    {
      title: "Edit",
      Icon: EditIcon,
      onSelect: onEdit,
    },
    {
      title: "Delete",
      Icon: Trash2Icon,
      onSelect: () => setShowDeleteTeamModal(true),
    },
  ];

  return (
    <>
      <DeleteTeamModal />
      <TableActionColumn items={items} />
    </>
  );
};

export default TeamTableActionColumn;
