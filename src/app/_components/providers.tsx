import { TRPCReactProvider } from "~/trpc/react";

export default async function Providers({
    children,

}: {
    children: React.ReactNode;
}) {
    return (
        <TRPCReactProvider>
            {children}
        </TRPCReactProvider>
    );
}
