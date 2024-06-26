import { Copy, Expand, ZoomIn } from "lucide-react"
import Link from "next/link"

import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

import { campaigns } from "~/server/db/schema"
export function CampaignDialog({ campaign }: { campaign: typeof campaigns.$inferSelect }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}><ZoomIn className="w-3 h-3" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{campaign.name}</DialogTitle>
                    <DialogDescription>
                        {campaign.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-500 dark:text-muted-foreground">Preview Link</p>
                    <div className="grid flex-1 gap-2">
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Link href={`/campaign/${campaign.id}`}>
                            <Button type="button" variant="secondary">
                                View campaign
                            </Button>
                        </Link>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
