"use client"
import clsx from "clsx";
import { ChevronLeft, Expand, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateAdSetDialog } from "~/app/_components/create-adset";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Textarea } from "~/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { api } from "~/trpc/react"


export default function CampaignPage({ params }: { params: { campaignId: string } }) {
    let [editMode, updateEditMode] = useState(false);
    let router = useRouter();
    let searchParams = useSearchParams();
    let urlEditMode = searchParams.get('edit');

    useEffect(() => {
        if (urlEditMode == 'true') {
            updateEditMode(true);
        }
    }, [editMode]);

    let [campaign, campaignQuery] = api.campaign.getCampaignById.useSuspenseQuery({ campaignId: params.campaignId });

    if (campaign == undefined) {
        return '<p>Error fetching campaign.</p>';
    }

    return (
        <div className="mx-auto grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
                <Button onClick={() => router.back()} variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {campaign?.name}
                </h1>
                <Badge variant="outline" className="ml-auto text-white sm:ml-0" style={{ backgroundColor: campaign?.channel.themeColor ?? '#fff' }}>
                    {campaign?.channel.name}
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    {!editMode && (
                        <Button onClick={() => updateEditMode(true)} variant="outline" size="sm">
                            Edit
                        </Button>
                    )}
                    {editMode && (
                        <>
                            <Button onClick={() => { router.push(`/campaign/${campaign?.id}`); router.refresh() }} variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm">Save Campaign</Button>
                        </>
                    )}
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>{campaign.channel.campaignName} Details</CardTitle>
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
                                    defaultValue={campaign?.name ?? ""}
                                />

                                {editMode && <Label htmlFor="description">Description</Label>}
                                <Textarea
                                    readOnly={!editMode}
                                    id="description"
                                    defaultValue={campaign?.description ?? ""}
                                    className={clsx({ "min-h-32 text-muted-foreground": true },
                                        { "border-transparent rounded-none p-0 focus-visible:ring-0 focus:ring-0 cursor-default": !editMode })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                            <CardTitle>{campaign?.channel.adSetName}s</CardTitle>
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
                                    {campaign?.adsets.map(adset => (<TableRow key={adset.id}>
                                        <TableCell className="font-semibold">
                                            {adset.name}
                                        </TableCell>
                                        <TableCell>
                                            {adset.description}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/campaign/${campaign.id}/adsets/${adset.id}`}>
                                                <Button size={"icon"}><Expand /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                            <CreateAdSetDialog campaignId={campaign.id} title={campaign?.channel.adSetName ?? "Ad Set"} />
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
                                <p className="flex gap-2"><span className="font-bold">Objective</span><span>{campaign.objective}</span></p>
                                <p className="flex gap-2"><span className="font-bold">Created</span><span>{campaign.createdAt.toLocaleString()}</span></p>
                                {campaign.updatedAt && <p className="flex gap-2"><span className="font-bold">Last updated</span><span>{campaign.updatedAt?.toLocaleString()}</span></p>}
                            </div>
                        </CardContent>
                    </Card>
                    <Link href={`/client/${campaign.client.id}`}>
                        <Card className="hover:bg-muted transition-colors duration-150">
                            <CardHeader>
                                <CardTitle>Client</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {campaign.client.name}
                            </CardContent>
                            <CardFooter>
                                <Button className="ml-auto mr-0" variant={"outline"}>View client</Button>
                            </CardFooter>
                        </Card>
                    </Link>

                </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Save Campaign</Button>
            </div>
        </div >

    )
}