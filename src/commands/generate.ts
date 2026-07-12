import { Command } from "commander";
import { generateRequest } from "../services/aiService.js";
import { sendRequest } from "../services/requestService.js";
import { saveRequest } from "../services//storageService.js";

const generateCommand = new Command("generate")
    .argument("<prompt>")
    .option("--save")
    .option("--run")
    .action(async (prompt, options) => {

        const request = await generateRequest(prompt);

        console.log(request);

        if (options.save) {
            saveRequest(request);
        }

        if (options.run) {
            const response = await sendRequest(request);
            console.log(response);
        }

    });

export default generateCommand;