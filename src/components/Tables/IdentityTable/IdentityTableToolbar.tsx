import QuerySearch from "@/components/Common/QuerySearch";
import IdentityTablePrint from "./IdentityTablePrint";
import { useCreateUpdateIdentityModal } from "@/components/Dialogs/CreateUpdateIdentityDialog";

const IdentityTableToolbar: React.FC = () => {
  const { CreateUpdateIdentityModal, CreateIdentityButton } =
    useCreateUpdateIdentityModal({ id: null });

  return (
    <div className="flex items-center gap-2">
      <CreateUpdateIdentityModal />
      <QuerySearch
        className="mr-auto flex-1 sm:max-w-[240px] sm:flex-initial lg:max-w-[320px]"
        placeholder="Search..."
      />
      <CreateIdentityButton />
      <IdentityTablePrint />
    </div>
  );
};
export default IdentityTableToolbar;
