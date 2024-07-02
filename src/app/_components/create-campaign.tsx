"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

import { api } from "~/trpc/react";

export function CreateCampaign({ clientId = "" }: { clientId?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [clientIdInput, setClientId] = useState(clientId);
  const [channelId, setChannelId] = useState("");

  const createCampaign = api.campaign.create.useMutation();
  const clients = api.client.getClients.useQuery();
  const channels = api.channel.getChannels.useQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    createCampaign.mutate({
      name: name,
      objective: objective,
      channelId: channelId,
      clientId: clientIdInput,
      description: description
    }, {
      onSuccess(data) {
        setName("");
        setDescription("");
        setObjective("");
        setChannelId("");
        setClientId("");
        setChannelId("");
        router.push(`/campaign/${data[0]?.id}`)
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 col-span-3"
    >

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {clientId == "" && <div>
        <Label htmlFor="client">Client</Label>
        <Select
          name="client"
          value={clientId}
          defaultValue={clientId}
          onValueChange={(e) => setClientId(e)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            {clients.data && clients.data.map(client => (
              <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>}
      <div>
        <Label htmlFor="channel">Channel</Label>
        <Select
          name="channel"
          value={channelId}
          required
          defaultValue={channelId}
          onValueChange={(e) => setChannelId(e)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a channel" />
          </SelectTrigger>
          <SelectContent>
            {channels.data && channels.data.map(channel => {
              return <SelectItem key={channel.id} value={channel.id}>{channel.name}</SelectItem>
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="objective">Objective</Label>
        <Select
          name="objective"
          required
          defaultValue={objective}
          onValueChange={(e) => setObjective(e)}
          value={objective}
        >
          <SelectTrigger
            id="category"
            aria-label="Select category"
          >
            <SelectValue placeholder="Select an objective" />
          </SelectTrigger>
          <SelectContent>
            {channels.data?.find(x => x.id == channelId)?.objectives?.map((obj, index) => (
              <SelectItem key={index} value={obj}>{obj}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button
        variant={"default"}
        type="submit"
        disabled={createCampaign.isPending}
        className="w-min"
      >
        {createCampaign.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
