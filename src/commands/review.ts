import { Command } from "commander";

import { buildRequest } from "../services/requestBuilder.js";
import { sendRequest, handleAxiosError } from "../services/requestService.js";
import { reviewApi } from "../services/aiService.js";
import { normalizeUrl } from "../utils/url.js";

interface ReviewOptions {
    header?: string[];
    data?: string[];
}

const reviewCommand = new Command("review")
    .description("Review an API using AI")
    .argument("[methodOrUrl]")
    .argument("[url]")
    .option("-H, --header <header...>")
    .option("-d, --data <data...>")
    .action(async (methodOrUrl, url, options: ReviewOptions) => {

        if (!methodOrUrl) {
            console.error("Usage: hammy review [method] <url>");
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

            console.log(" Reviewing API...\n");

            const review = await reviewApi(
                request,
                response
            );

            console.log(review);

        } catch (error) {

            handleAxiosError(error);

        }

    });

export default reviewCommand;