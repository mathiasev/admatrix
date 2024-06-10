import { TooltipProvider } from "~/components/ui/tooltip";
import { TRPCReactProvider } from "~/trpc/react";

export default async function Providers({
    children,

}: {
    children: React.ReactNode;
}) {
    return (
        <TRPCReactProvider>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </TRPCReactProvider>
    );
}
