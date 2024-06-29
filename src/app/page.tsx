
import { CreateCampaign } from "~/app/_components/create-campaign";
import { CreateClient } from "./_components/create-client";
import { CreateChannel } from "./_components/create-channel";
import { CreateCampaignDialog } from "./_components/create-campaign-dialog";

export default async function Home() {

  return (
    <section className="col-span-3 grid grid-cols-4 gap-4">
      <CreateCampaignDialog label="Campaign" />
      <CreateClient />
    </section>
  );
}
