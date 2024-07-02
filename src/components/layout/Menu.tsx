import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DownloadCloud, Home, PanelsTopLeft, Tag } from "lucide-react";
import Nav from "~/lib/nav";

export default function Menu() {
    return (
        <nav>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/"
                        className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Home</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/campaigns"
                        className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <PanelsTopLeft className="h-5 w-5" />
                        <span className="sr-only">Campaigns</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Campaigns</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/clients"
                        className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Tag className="h-5 w-5" />
                        <span className="sr-only">Clients</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Clients</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/import"
                        className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                    >

                        <DownloadCloud className="h-5 w-5" />
                        <span className="sr-only">Import</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Import</TooltipContent>
            </Tooltip>
        </nav>
    )
}