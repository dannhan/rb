// TODO:

import * as React from "react";
import Link from "next/link";

import { useUploadFile } from "@/hooks/use-upload-file";

import type { Row } from "@tanstack/react-table";
import type { WithId, TeamMember } from "@/types";

import { PlusCircle } from "lucide-react";

type Props = {
  row: Row<WithId<TeamMember>>;
};

const TableFileColumn: React.FC<Props> = ({}) => {
  return null;
};

export default TableFileColumn;
