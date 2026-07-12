import { Command } from "commander";
import { readData, writeData } from "../utils/storage.js";
import { parseHeaders, parseDataArg } from "../utils/parser.js";
import { ApiRequest, HttpMethod } from "../types/request.js";

interface EditOptions {
    method?: HttpMethod;
    url?: string;
    header?: string[];
    data?: string[];
}

const editCommand = new Command("edit")
    .description("Edit a saved request")
    .argument("<id>", "ID of the request to edit")
    .option("-m, --method <method>", "HTTP method")
    .option("-u, --url <url>", "API endpoint URL")
    .option(
        "-H, --header <header...>",
        'Add custom header, e.g. -H "Content-Type: application/json"'
    )
    .option(
        "-d, --data <data...>",
        "Add request body (JSON or key=value pairs)"
    )
    .action((id: string, options: EditOptions): void => {
        const data: ApiRequest[] = readData();

        const index = data.findIndex(
            (request) => request.id === Number(id)
        );

        if (index === -1) {
            console.error(`❌ Request with ID ${id} not found.`);
            return;
        }

        const request = data[index];

        if (options.method) {
            request.method = options.method.toUpperCase() as HttpMethod;
        }

        if (options.url) {
            request.url = options.url;
        }

        if (options.header) {
            request.headers = parseHeaders(options.header);
        }

        if (options.data) {
            const parsedData = parseDataArg(options.data);

            request.body =
                typeof parsedData === "string"
                    ? tryParseJson(parsedData)
                    : parsedData;
        }

        data[index] = request;

        writeData(data);

        console.log(`✅ Request with ID ${id} updated successfully.`);
    });

export default editCommand;

function tryParseJson(value: string): unknown {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}