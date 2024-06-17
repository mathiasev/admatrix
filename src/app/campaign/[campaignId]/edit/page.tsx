"use client";
import { api } from "~/trpc/react";


export default function CampaignPage({ params }: { params: { campaignId: string; }; }) {


    let campaign = api.campaign.getCampaignById.useQuery({ campaignId: params.campaignId });

    if (campaign.isError) {
        return (
            <div>Error {campaign.error.message}</div>
        );
    }

    return (
        <div className="">
            Campaign Name: {campaign.data && campaign.data.name}
        </div>
    );
}
