
import { CreateCampaign } from "~/app/_components/create-campaign";
import { CreateClient } from "./_components/create-client";
import { CampaignTable } from "./_components/campaign-table";

export default async function Home() {

  return (
    <section className="col-span-3 grid grid-cols-4 gap-4">
      <CreateCampaign />
      <CreateClient />
      <CampaignTable />
    </section>
  );
}
