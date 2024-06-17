"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import { api } from "~/trpc/react";

export function CreateCampaign() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [clientId, setClientId] = useState("");
  const [channelId, setChannelId] = useState("");

  const createCampaign = api.campaign.create.useMutation({
    onSuccess: () => {

      setName("");
      setDescription("");
      setObjective("");
      setChannelId("");
      setClientId("");
      setChannelId("");

      router.push(`/campaign/`);
    },
  });

  const clients = api.client.getClients.useQuery();
  const channels = api.channel.getChannels.useQuery();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCampaign.mutate({
          name: name,
          objective: objective,
          channelId: channelId,
          clientId: clientId,
          description: description
        });
      }}
      className="flex flex-col gap-2 col-span-3"
    >
      <Card
        className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
      >
        <CardHeader className="pb-3">
          <CardTitle>Create Campaign</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed ">
          </CardDescription>
        </CardHeader>
        <CardContent>


          <div className="flex flex-col gap-2">
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            />

            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-full px-4 py-2"
              required
            >
              <option id="none" value="" disabled >Select a client</option>
              {clients.data && clients.data.map(client => {
                return <option key={client.id} value={client.id}>{client.name}</option>
              })}
            </select>
            <select
              required
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            >
              <option id="none" value="" disabled >Select a channel</option>
              {channels.data && channels.data.map(channel => {
                return <option key={channel.id} value={channel.id}>{channel.name}</option>
              })}
            </select>

            <select
              required
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            >
              <option id="none" value="" disabled>Select an objective</option>
              {channels.data?.find(x => x.id == channelId)?.objectives?.map((obj, index) => (
                <option key={index} id={obj} value={obj}>{obj}</option>
              ))}
            </select>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            />
            <Button
              variant={"default"}
              type="submit"
              disabled={createCampaign.isPending}
            >
              {createCampaign.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </form>
  );
}
