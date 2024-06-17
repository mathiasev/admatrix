
export default function CampaignLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="col-span-3">
            <p>Campaign</p>
            {children}
        </div>
    )
}