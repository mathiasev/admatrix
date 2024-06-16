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
  const [client, setClient] = useState("");

  const createCampaign = api.campaign.create.useMutation({
    onSuccess: () => {
      setName("");
      setDescription("");
      setObjective("");
      setClient("");
      // revalidatePath('/', 'page');
      router.refresh();
    },
  });

  const clients = api.client.getClients.useQuery();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCampaign.mutate({
          name: name,
          objective: objective,
          client: client,
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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            />
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            >
              <option id="none" value="" disabled selected>Select an objective</option>
              <option id="awareness" value="awareness">Awareness</option>
            </select>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            >
              <option id="none" value="" disabled selected>Select a client</option>
              {clients.data && clients.data.map(client => {
                return <option key={client.id} value={client.id}>{client.name}</option>
              })}
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
