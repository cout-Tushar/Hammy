import { Command } from "commander";
import { readData } from "../utils/storage.js";
import type { ApiRequest } from "../types/request.js";

const listCommand = new Command("list")
    .description("List all saved API request configurations")
    .action((): void => {
        const data: ApiRequest[] = readData();

        if (data.length === 0) {
            console.log("No saved requests found.");
            return;
        }

        console.log("Saved API Requests:\n");

        data.forEach((request: ApiRequest): void => {
            console.log(
                `ID: ${request.id} | Method: ${request.method} | URL: ${request.url}`
            );
        });
    });

export default listCommand;