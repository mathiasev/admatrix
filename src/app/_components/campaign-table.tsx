"use client"

import { MoreVertical } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

import { api } from "~/trpc/react";
import { CampaignDialog } from "./campaign-dialog";
import Link from "next/link";

export function CampaignTable() {

    const campaigns = api.campaign.getCampaigns.useQuery();

    return (
        <Card x-chunk="dashboard-05-chunk-3" className="col-span-4">
            <CardHeader className="px-7">
                <CardTitle>Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
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
                                        <CampaignDialog campaign={campaign} />
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
                                                <Link href={`/campaign/${campaign.id}`}>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem>Export</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Trash</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </CardContent>
        </Card>)
}