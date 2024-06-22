"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";


export default function SettingsPage({ children, channels }: { children: React.ReactNode, channels: React.ReactNode }) {

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