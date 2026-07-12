import { Command } from "commander";

import { buildRequest } from "../services/requestBuilder.js";
import { sendRequest, handleAxiosError } from "../services/requestService.js";
import { explainApi } from "../services/aiService.js";
import { normalizeUrl } from "../utils/url.js";


interface ExplainOptions {
    header?: string[];
    data?: string[];
}


const explainCommand = new Command("explain")
    .description("Explain an API using AI")
    .argument("<methodOrUrl>")
    .argument("[url]")
    .option("-H, --header <header...>")
    .option("-d, --data <data...>")
    .action(async(methodOrUrl, url, options: ExplainOptions)=>{

        try{

            const request = buildRequest(
                methodOrUrl,
                url,
                options
            );


            request.url = normalizeUrl(request.url);


            const response = await sendRequest(request);


            console.log(" Explaining API...\n");


            const explanation = await explainApi(
                request,
                response
            );


            console.log(explanation);


        }catch(error){

            handleAxiosError(error);

        }

    });


export default explainCommand;