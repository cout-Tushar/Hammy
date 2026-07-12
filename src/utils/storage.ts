import fs from "fs";
import os from "os";
import path from "path";

import type { ApiRequest } from "../types/request.js";

const dir = path.join(os.homedir(), ".apix");
const file = path.join(dir, "requests.json");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]", "utf-8");
}

export const readData = (): ApiRequest[] => {
    const data = fs.readFileSync(file, "utf-8");

    try {
        return JSON.parse(data) as ApiRequest[];
    } catch {
        return [];
    }
};

export const writeData = (data: ApiRequest[]): void => {
    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
};