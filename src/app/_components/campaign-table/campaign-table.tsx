"use client"

import { MoreVertical } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

import { api } from "~/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { revalidatePath } from "next/cache";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { CampaignDialog } from "../campaign-dialog";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { CreateCampaignDialog } from "../create-campaign-dialog";

export function CampaignTable() {

    const router = useRouter();
    const campaigns = api.campaign.getCampaigns.useQuery();

    const deleteCampaign = api.campaign.delete.useMutation();

    const handleTrashClick = (campaignId: string) => {
        deleteCampaign.mutate({
            id: campaignId
        }, {
            onSuccess(data) {
                router.refresh()
            },
        });
    }

    return (
        <Card x-chunk="dashboard-05-chunk-3" className="col-span-4">
            <CardHeader className="px-7 flex flex-row justify-between items-center">
                <CardTitle>Campaigns</CardTitle>

                <CreateCampaignDialog />

            </CardHeader>
            <CardContent>
                {campaigns.data && <DataTable columns={columns} data={campaigns.data} />}
                {/* <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Channel
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Objective
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Client
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Description
                            </TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {campaigns.data && campaigns.data.map((campaign) => {
                            return (
                                <TableRow key={campaign.id} >
                                    <TableCell>
                                        <Link href={`/campaign/${campaign.id}`}>
                                            {campaign.name}
                                        </Link>
                                        <CampaignDialog campaign={campaign} />
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant="default" style={{ backgroundColor: campaign.channel.themeColor ?? '#fff' }}>
                                            {campaign.channel.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {campaign.objective}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {campaign.client.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {campaign.description}
                                    </TableCell>
                                    <TableCell className="text-right">

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="outline" className="h-8 w-8">
                                                    <MoreVertical className="h-3.5 w-3.5" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Link href={`/campaign/${campaign.id}?edit=true`}>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem>Export</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem >
                                                    <Button variant={"destructive"} className="w-full" size={"sm"} onClick={(e) => { handleTrashClick(campaign.id); e.preventDefault() }}>
                                                        Trash
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table> */}
            </CardContent >
        </Card >)
}