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
                                <AccordionItem key={channel.id} value={channel.id}>
                                    <AccordionTrigger className="font-bold" style={{ color: channel.themeColor ?? '#fff' }}>{channel.name}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-base">
                                                            Campaign Structure
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="bg-stone-900 text-stone-400 pt-4 pl-4">
                                                            <p className="mb-3">{channel.campaignName}</p>
                                                            <div className="bg-stone-800 text-stone-300 pt-4 pl-4">
                                                                <p className="mb-3">{channel.adSetName}</p>
                                                                <div className="bg-stone-700 text-stone-200 py-4 pl-4">
                                                                    <p>{channel.adName}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                            <div className="">
                                                <Card>
                                                    <CardHeader >
                                                        <CardTitle>Objectives</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <ul className="grid gap-4">
                                                            {channel.objectives?.map(objective => (
                                                                <li key={objective}>{objective}</li>
                                                            ))}
                                                        </ul>
                                                    </CardContent>
                                                </Card>
                                            </div>
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