import ImagesDashboardPage from "../ImagesDashboardPage";

type Props = { params: Promise<{ project: string }> };
const Page: React.FC<Props> = async (props: Props) => {
  const params = await props.params;

  return <ImagesDashboardPage params={params} title="RAB" route="rab" />;
};

export default Page;
