"use client"

import { useRouter } from "next/navigation";
import { CreateChannel } from "~/app/_components/create-channel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTrigger } from "~/components/ui/dialog";
import { api } from "~/trpc/react";


export default function ChannelsPage() {

    let router = useRouter();
    let channels = api.channel.getChannels.useQuery();

    const deleteChannelMutation = api.channel.deleteChannel.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    function deleteChannel(channelId: string) {
        deleteChannelMutation.mutate({
            id: channelId
        })
    }

    return (
        <section className="">
            <Card>
                <CardHeader>
                    <CardTitle>Channels</CardTitle>
                    <CardDescription>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"secondary"} size={"sm"}>
                                    Create
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    Create Channel
                                </DialogHeader>
                                <CreateChannel />
                            </DialogContent>
                        </Dialog>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Accordion type="single" collapsible className="w-full">
                            {channels.data && channels.data.map(channel => (
                                <AccordionItem value={channel.id}>
                                    <AccordionTrigger>{channel.name}</AccordionTrigger>
                                    <AccordionContent>
                                        <div>
                                            <p><strong>Objectives</strong></p>
                                            <ul className="list-inside list-disc">
                                                {channel.objectives?.map(objective => (
                                                    <li key={objective}>{objective}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="w-full flex justify-end">
                                            <Button onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    deleteChannel(channel.id);
                                                }
                                            } size={"sm"} className="ml-auto mr-0" variant={"destructive"}>Delete channel</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </form>
                </CardContent>
            </Card>
        </section >

    )
}