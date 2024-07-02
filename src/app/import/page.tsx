"use client"

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import handleFile from "../api/file/handleFile";

export default function ImportPage() {

    const [stage, setStage] = useState(0);
    const [platform, setPlatform] = useState("");
    const [ads, setAds] = useState<string[][]>([]);

    const handleFileUpload = async (files: FileList | null) => {
        console.log(files);
        if (!files?.length) return;
        for (let i = 0; i < files.length; i++) {

            handleFile(files[i] as File, platform).then((data) => {
                setAds([...ads, ...data]);
            });
        }
    }

    return (
        <form className="flex flex-col gap-4">
            {stage >= 0 && <Card className="w-full">
                <CardHeader>
                    <CardTitle>Platform</CardTitle>
                    <CardDescription>
                        Select which platform to import your campaigns from.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Select
                        name="platform"
                        value={platform}
                        onValueChange={(e) => setPlatform(e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="meta">
                                Meta
                            </SelectItem>
                            <SelectItem value="google">
                                Google
                            </SelectItem>
                            <SelectItem value="linkedin">
                                LinkedIn
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setStage(1);
                    }}>Next</Button>
                </CardFooter>
            </Card>}
            {stage >= 1 &&
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Campaigns</CardTitle>
                        <CardDescription>
                            Upload the export file from {platform.slice(0, 1).toUpperCase() + platform.slice(1)}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <input type="file" name="file" required className=""
                            onChange={(e) => {
                                handleFileUpload(e.target.files);
                            }}
                        />
                        <pre className="whitespace-pre-wrap bg-gray-500 p-4 rounded-lg">
                            {JSON.stringify(ads, null, 2)}
                        </pre>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();

                                setStage(2);
                            }}
                        >Import</Button>
                    </CardFooter>
                </Card>}
        </form>
    );
}