"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

import { campaigns } from "~/server/db/schema"
import { api } from "~/trpc/react";

type nestedCampaign = {
    id: string;
    name: string | null;
    objective: string | null;
    description: string | null;
    channelId: string;
    createdById: string;
    createdAt: Date;
    updatedAt: Date | null;
    clientId: string;
    channel: {
        name: string | null,
        themeColor: string | null,
        campaignName: string | null,
        adSetName: string | null,
        adName: string | null,
        objectives: string[] | null,
        createdById: string
    },
    client: {
        id: string,
        name: string | null
    }

}


export const columns: ColumnDef<nestedCampaign>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }, {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Link href={`/campaign/${row.original.id}`} className="hover:underline">
                    {row.original.name}
                </Link>
            )
        }
    },
    {
        accessorKey: "channel",
        header: "Channel",
        accessorFn: ({ channel }) => {
            return channel.name;
        },
        cell: ({ row }) => {

            const name = row.original.channel.name;
            const color = row.original.channel.themeColor;

            return <Badge style={{ backgroundColor: color ?? "#fff" }}>{name}</Badge>
        },
    },
    {
        accessorKey: "client",
        accessorFn: (client) => {
            return client.name
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "objective",
        header: "Objective",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const campaign = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(campaign.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {


                                handleTrashClick(campaign.id)
                            }
                            }
                        >
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    },
]
