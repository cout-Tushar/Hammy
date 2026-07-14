import { Command } from "commander";
import { buildRequest } from "../services/requestBuilder.js";
import { sendRequest, handleAxiosError, } from "../services/requestService.js";
import { securityAudit } from "../services/aiService.js";
import { normalizeUrl } from "../utils/url.js";
const auditCommand = new Command("audit")
    .description("Perform an AI-powered security audit of an API")
    .argument("[methodOrUrl]", "HTTP Method or Saved Request ID")
    .argument("[url]", "API URL")
    .option("-H, --header <header...>", "Add custom headers")
    .option("-d, --data <data...>", "Request body")
    .action(async (methodOrUrl, url, options) => {
    if (!methodOrUrl) {
        console.error("Usage: hammy audit [method] <url>");
        return;
    }
    try {
        const request = buildRequest(methodOrUrl, url, options);
        request.url = normalizeUrl(request.url);
        const response = await sendRequest(request);
        console.log("🔒 Running AI Security Audit...\n");
        const report = await securityAudit(request, response);
        console.log(report);
    }
    catch (error) {
        handleAxiosError(error);
    }
});
export default auditCommand;
