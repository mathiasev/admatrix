import { useUser } from "@clerk/nextjs";

import { clerkClient } from '@clerk/clerk-sdk-node';
import { useEffect, useState } from "react";


export default async function UserInfo() {
    const [user, setUser] = useState<any>();
    useEffect(() => {
        clerkClient.users.getCount().then(res => setUser(res));
    }, [user]);

    return (
        <div className="flex items-center gap-4">
            <pre className=" whitespace-pre bg-gray-500 p-4 rounded-lg">
                {JSON.stringify(useUser()?.user?.verifiedExternalAccounts)}
            </pre>
            {/* TODO: Get api key from clerk */}
        </div>
    );
}   