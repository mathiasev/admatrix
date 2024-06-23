import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { CreateAdSet } from "./create-adset"

export function CreateAdSetDialog({ title, campaignId }: { title: string, campaignId: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create {title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create {title}</DialogTitle>
                    <DialogDescription>
                        Create a new {title.toLowerCase()}. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <CreateAdSet campaignId={campaignId} title={title} />
            </DialogContent>
        </Dialog >
    )
}
