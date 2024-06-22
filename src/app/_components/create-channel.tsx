"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";

import { api } from "~/trpc/react";

export function CreateChannel() {

  const router = useRouter();
  const [name, setName] = useState("");
  const [themeColor, setThemeColor] = useState("#ffffff");
  const [campaignName, setCampaignName] = useState("Campaign");
  const [adSetName, setAdSetName] = useState("Ad Set");
  const [adName, setAdName] = useState("Ad");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState("");

  const createChannel = api.channel.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setThemeColor("#ffffff");
      setCampaignName("Campaign");
      setAdSetName("Ad Set");
      setAdName("Ad");
      setNewObjective("");
    },
  });

  function addNewObjective() {
    setObjectives([...objectives, newObjective]);
    setNewObjective("");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createChannel.mutate({
          name,
          themeColor,
          objectives,
          adName,
          adSetName,
          campaignName
        });
      }}
      className="flex flex-col gap-2 "
    >

      <div className="flex flex-col gap-2">

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2"
        />
        <input
          type="color"
          placeholder="Theme Colour"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="w-full rounded-full px-4 py-2 h-12 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Campaign Name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className="w-full rounded-full px-4 py-2"
        />
        <input
          type="text"
          placeholder="Ad Set Name"
          value={adSetName}
          onChange={(e) => setAdSetName(e.target.value)}
          className="w-full rounded-full px-4 py-2"
        />
        <input
          type="text"
          placeholder="Ad Name"
          value={adName}
          onChange={(e) => setAdName(e.target.value)}
          className="w-full rounded-full px-4 py-2"
        />

        <div>
          <p>Objectives</p>
          <ul className="list-disc list-inside text-muted-foreground my-2">
            {objectives.map((objective, id) => (
              <li key={id}>{objective}</li>
            )
            )}
          </ul>
          <div className="flex gap-1">
            <input value={newObjective} className="w-full rounded-full px-4 py-2" type="text" name="objective" onChange={(e) => setNewObjective(e.target.value)} />
            <Button onClick={(e) => {
              e.preventDefault();
              addNewObjective()
            }
            }
            >
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button
          variant={"default"}
          type="submit"
          disabled={createChannel.isPending}
        >
          {createChannel.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
