import { EditIcon, Trash2Icon } from "lucide-react";
import { useDeleteIdentityDialog } from "@/components/Dialogs/DeleteIdentityDialog";
import TableActionColumn from "@/components/Tables/TableActionColumn";

const IdentityTableActionColumn: React.FC<{
  id: string;
  onEdit: () => void;
}> = ({ id, onEdit }) => {
  const { openDeleteIdentityModal, DeleteIdentityDialog } =
    useDeleteIdentityDialog({ id });
  const items = [
    {
      title: "Edit",
      Icon: EditIcon,
      onSelect: onEdit,
    },
    {
      title: "Delete",
      Icon: Trash2Icon,
      onSelect: openDeleteIdentityModal,
    },
  ];

  return (
    <>
      <DeleteIdentityDialog />
      <TableActionColumn items={items} />
    </>
  );
};

export default IdentityTableActionColumn;
