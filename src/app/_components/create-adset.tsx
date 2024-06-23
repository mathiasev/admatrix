import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { api } from "~/trpc/react"

export function CreateAdSet({ title, campaignId }: { title: string, campaignId: string }) {
    let router = useRouter()
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");


    const createAdSet = api.adset.create.useMutation({
        onSuccess: () => {
            setName("");
            setDescription("");
            router.refresh();
        },
    });


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createAdSet.mutate({
                    name: name,
                    description: description,
                    campaignId
                });
            }}>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Input
                        id="description"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="col-span-3"
                    />
                </div>
            </div>
            <Button type="submit">Create {title}</Button>
        </form>
    )
}
