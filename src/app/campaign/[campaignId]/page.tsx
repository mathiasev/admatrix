"use client"


export default function CampaignPage({ params }: { params: { campaignId: string } }) {

    return (
        <div className="">
            Params: {JSON.stringify(params)}
        </div>
    )
}