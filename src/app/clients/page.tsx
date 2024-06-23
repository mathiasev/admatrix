"use client"

import { Tag } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react"

export default function CampaignsPage() {

    let clients = api.client.getClients.useQuery();

    return (
        <section className="col-span-3 grid grid-cols-4 gap-4">
            {clients.data && clients.data.map(client => (
                <Link href={`/client/${client.id}`} >
                    <Card key={client.id} className="hover:bg-secondary transition-colors duration-150">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{client.name}</CardTitle>
                            <Tag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{client.campaigns.length}</div>
                            <p className="text-xs text-muted-foreground">campaigns</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}

        </section>
    )
}