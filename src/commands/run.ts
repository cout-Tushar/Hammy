import { Command } from "commander";

import { buildRequest } from "../services/requestBuilder.js";
import {
    sendRequest,
    handleAxiosError,
} from "../services/requestService.js";

import { normalizeUrl } from "../utils/url.js";

interface RunOptions {
    header?: string[];
    data?: string[];
}

const runCommand = new Command("run")
    .description("Run an API request")
    .argument("[methodOrUrl]", "HTTP Method or Saved Request ID")
    .argument("[url]", "API URL")
    .usage("[method] <url> [options]")
    .option(
        "-H, --header <header...>",
        "Add custom headers"
    )
    .option(
        "-d, --data <data...>",
        "Request body"
    )
    .action(
        async (
            methodOrUrl: string | undefined,
            url: string | undefined,
            options: RunOptions
        ): Promise<void> => {

            if (!methodOrUrl) {
                console.error(
                    "Usage: hammy run [method] <url> [options]"
                );
                return;
            }

            try {

                const request = buildRequest(
                    methodOrUrl,
                    url,
                    options
                );

                request.url = normalizeUrl(request.url);

                const response = await sendRequest(request);

                console.log("\n✔ Request Successful");
                console.log(`Status : ${response.status}`);
                console.log(`Time   : ${response.time} ms`);
                console.log(`Size   : ${response.size} bytes\n`);

                console.log(
                    JSON.stringify(response.data, null, 2)
                );

            } catch (error: unknown) {

                handleAxiosError(error);

            }

        }
    );

export default runCommand;