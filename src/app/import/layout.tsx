import Link from "next/link"

export default function ImportLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-4 gap-4 col-span-4">
            <div>

                <nav
                    className="grid gap-4 text-sm text-muted-foreground col-span-1"
                >

                    <Link href="#" className="font-semibold text-primary">Platform</Link>
                    <Link href="#">Settings</Link>
                    <Link href="#">Confirm</Link>

                </nav>
            </div>
            <div className="col-span-3">
                {children}
            </div>
        </div>
    )
}