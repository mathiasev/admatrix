"use client"
import clsx from "clsx";
import { ChevronLeft, Expand, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateCampaignDialog } from "~/app/_components/create-campaign-dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react"


export default function ClientPage({ params }: { params: { clientId: string } }) {
    let [editMode, updateEditMode] = useState(false);
    let router = useRouter();
    let searchParams = useSearchParams();
    let urlEditMode = searchParams.get('edit');

    useEffect(() => {
        if (urlEditMode == 'true') {
            updateEditMode(true);
        }
    }, [editMode]);

    let [client, clientQuery] = api.client.getClientById.useSuspenseQuery({ clientId: params.clientId });

    if (client == undefined) {
        return '<p>Error fetching client.</p>';
    }

    return (
        <div className="mx-auto grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
                <Button onClick={() => router.back()} variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {client?.name}
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    {!editMode && (
                        <Button onClick={() => updateEditMode(true)} variant="outline" size="sm">
                            Edit
                        </Button>
                    )}
                    {editMode && (
                        <>
                            <Button onClick={() => { router.push(`/client/${client?.id}`); router.refresh() }} variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm">Save Client</Button>
                        </>
                    )}
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>Client Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">

                                {editMode && <Label htmlFor="name">Name</Label>}
                                <Input
                                    readOnly={!editMode}
                                    className={
                                        clsx({ "w-full": true },
                                            { "border-transparent p-0 focus-visible:ring-0 focus:ring-0 cursor-default": !editMode }
                                        )}
                                    id="name"
                                    type="text"
                                    defaultValue={client?.name ?? ""}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                            <CardTitle>Campaigns</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing elit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Notes</TableHead>
                                        <TableHead className="w-[100px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {client.campaigns?.map(campaign => (<TableRow key={campaign.id}>
                                        <TableCell className="font-semibold flex gap-2">
                                            <span>{campaign.name}</span>
                                            <Badge style={{ backgroundColor: campaign.channel.themeColor ?? '#ffffff' }}>{campaign.channel.name}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {campaign.description}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/campaign/${campaign.id}`}>
                                                <Button size={"icon"}><Expand /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                            <CreateCampaignDialog clientId={client.id} />
                        </CardFooter>
                    </Card>

                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card
                        className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                    >
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <p className="flex gap-2"><span className="font-bold">Created</span><span>{client.createdAt.toLocaleString()}</span></p>
                                {client.updatedAt && <p className="flex gap-2"><span className="font-bold">Last updated</span><span>{client.updatedAt?.toLocaleString()}</span></p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Save Client</Button>
            </div>
        </div >

    )
}