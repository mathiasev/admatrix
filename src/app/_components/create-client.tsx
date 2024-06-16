"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import { api } from "~/trpc/react";

export function CreateClient() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createClient = api.client.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createClient.mutate({
          name
        });
      }}
      className="flex flex-col gap-2 "
    >
      <Card
        className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
      >
        <CardHeader className="pb-3">
          <CardTitle>Create Client</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">

            <input
              type="text"
              placeholder="Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full px-4 py-2"
            />
            <Button
              variant={"default"}
              type="submit"
              disabled={createClient.isPending}
            >
              {createClient.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </form>
  );
}
