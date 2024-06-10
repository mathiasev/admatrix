import { TooltipProvider } from "~/components/ui/tooltip";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./theme-provider";

export default async function Providers({
    children,

}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TRPCReactProvider>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </TRPCReactProvider>
        </ThemeProvider>
    );
}
