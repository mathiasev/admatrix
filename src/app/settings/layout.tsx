"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsLayout({ children, channels }: { children: React.ReactNode, channels: React.ReactNode }) {

    let router = useRouter();


    return (
        <div className="col-span-4 grid-cols-4 grid">

            <div>
                <nav
                    className="grid gap-4 text-sm text-muted-foreground"
                >
                    <Link href="#" className="font-semibold text-primary">
                        Channels
                    </Link>
                    <Link href="#">Ad Types</Link>
                </nav>
            </div>

            <div className="col-span-3">
                <section>{children}</section>
                <section>{channels}</section>
            </div>
        </div>
    )
}