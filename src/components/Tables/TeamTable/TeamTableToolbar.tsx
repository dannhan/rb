import { useCreateUpdateTeamModal } from "@/components/Dialogs/CreateUpdateTeamDialog";
import TableViewOptions from "@/components/Tables/TableViewOptions";
import TeamTablePrint from "./TeamTablePrint";
import TeamTableToolbarFilters from "./TeamTableToolbarFilters";

const TeamTableToolbar: React.FC = () => {
  const { CreateUpdateTeamModal, CreateTeamButton } = useCreateUpdateTeamModal({
    id: null,
  });

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <CreateUpdateTeamModal />
      <TeamTableToolbarFilters />
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-fit">
        <CreateTeamButton />
        <TeamTablePrint />
        <TableViewOptions
          columnNames={[
            "Pekerjaan",
            "SPK",
            "Pelaksana",
            "Status",
            "Attachment",
          ]}
        />
      </div>
    </div>
  );
};

export default TeamTableToolbar;
