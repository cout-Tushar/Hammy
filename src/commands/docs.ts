import { Command } from "commander";

import { buildRequest } from "../services/requestBuilder.js";
import {
    sendRequest,
    handleAxiosError,
} from "../services/requestService.js";

import { generateDocumentation } from "../services/aiService.js";
import { normalizeUrl } from "../utils/url.js";

interface DocsOptions {
    header?: string[];
    data?: string[];
}

const docsCommand = new Command("docs")
    .description("Generate API documentation using AI")
    .argument("[methodOrUrl]", "HTTP Method or Saved Request ID")
    .argument("[url]", "API URL")
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
            options: DocsOptions
        ): Promise<void> => {

            if (!methodOrUrl) {
                console.error(
                    "Usage: hammy docs [method] <url>"
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

                console.log("📚 Generating API documentation...\n");

                const docs = await generateDocumentation(
                    request,
                    response
                );

                console.log(docs);

            } catch (error: unknown) {

                handleAxiosError(error);

            }

        }
    );

export default docsCommand;