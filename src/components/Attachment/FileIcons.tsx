import {
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  PlusIcon,
  FileIcon,
  FileArchiveIcon,
} from "lucide-react";

const iconClass = "h-4 w-4";

const fileIconMap: Record<string, JSX.Element> = {
  image: <ImageIcon className={`${iconClass} text-green-500`} />,
  video: <VideoIcon className={`${iconClass} text-red-500`} />,
  audio: <MusicIcon className={`${iconClass} text-yellow-500`} />,
  text: <FileTextIcon className={`${iconClass} text-blue-500`} />,
  none: <PlusIcon className={`${iconClass} text-gray-400`} />,
};

const applicationIconMap: Record<string, JSX.Element> = {
  pdf: <FileTextIcon className={`${iconClass} text-red-700`} />,
  msword: <FileTextIcon className={`${iconClass} text-blue-700`} />,
  "vnd.openxmlformats-officedocument.wordprocessingml.document": (
    <FileTextIcon className={`${iconClass} text-blue-700`} />
  ),
  "vnd.ms-excel": <FileTextIcon className={`${iconClass} text-green-700`} />,
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet": (
    <FileTextIcon className={`${iconClass} text-green-700`} />
  ),
  "vnd.ms-powerpoint": (
    <FileTextIcon className={`${iconClass} text-orange-700`} />
  ),
  "vnd.openxmlformats-officedocument.presentationml.presentation": (
    <FileTextIcon className={`${iconClass} text-orange-700`} />
  ),
  zip: <FileArchiveIcon className={`${iconClass} text-purple-500`} />,
  "x-rar-compressed": (
    <FileArchiveIcon className={`${iconClass} text-purple-500`} />
  ),
  "x-7z-compressed": (
    <FileArchiveIcon className={`${iconClass} text-purple-500`} />
  ),
};

type FileIconsProps = { mimeType: string };

const FileIcons: React.FC<FileIconsProps> = ({ mimeType }) => {
  const [type, subType] = mimeType.split("/");

  if (type === "application" && applicationIconMap[subType]) {
    return applicationIconMap[subType];
  }

  return (
    fileIconMap[type] || <FileIcon className={`${iconClass} text-gray-500`} />
  );
};

export default FileIcons;
