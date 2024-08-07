import { ads } from "~/server/db/schema";
import { google } from "./reference";

type Ad = {
    name: string;
    description: string;
    format: string;
    adData: {
        name: string;
        value: string;
    }[];
    adSet: string;
    campaign: string;
}

export default function handleFile(file: File, platform: string): Promise<Ad[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            let data = e.target?.result as string;
            if (data) {
                let csvrows = data.split("\n") as string[];
                let rows = [] as string[][];
                csvrows.map(row => {
                    rows.push(row.split("\t") as string[]);
                });
                rows = rows.filter(row => {
                    if (row.length === 1 && row[0] === "") return false;
                    return true;
                });

                if (rows.length < 1) {
                    throw Error("Invalid file: No data")
                }

                if (platform === "google") {
                    let headerRow = rows[google.headerRowNumber - 1] as string[];
                    headerRow.map((value, index) => {
                        if (google.headerRow[index] !== value) {
                            throw new Error("Invalid file: Incorrect format");
                        }
                    })

                    let googleAdFormat = rows.slice(google.headerRowNumber).map((row) => {
                        return {
                            name: row[google.headerRow.indexOf("Ad ID")],
                            description: "",
                            format: row[google.headerRow.indexOf("Ad type")],
                            adSet: row[google.headerRow.indexOf("Ad group ID")],
                            campaign: row[google.headerRow.indexOf("Campaign Id")],
                            adData: row.map((value, index) => {
                                return {
                                    name: google.headerRow[index],
                                    value: value
                                }
                            })
                        }
                    }) as Ad[];
                    resolve(googleAdFormat);
                }

                reject("Invalid file: No channel/platform specified");
            }
        };
        reader.onerror = (e) => {
            reject(e);
        };
    });
}