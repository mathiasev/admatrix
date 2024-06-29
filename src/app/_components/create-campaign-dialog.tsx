import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { CreateCampaign } from "./create-campaign"

export function CreateCampaignDialog({ clientId = "", label = "" }: { clientId?: string, label?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create New {label}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New</DialogTitle>
                    <DialogDescription>
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <CreateCampaign clientId={clientId} />
            </DialogContent>
        </Dialog >
    )
}
