import { Command } from "commander";
import { readData, writeData } from "../utils/storage.js";

const deleteCommand = new Command("delete")
  .description("Delete a saved request")
  .argument("<id>", "ID of the request to delete")
  .action((id: string): void => {
    const storedData = readData();

    const requestExists = storedData.some(
      (request) => request.id === Number(id)
    );

    if (!requestExists) {
      console.error(`❌ Request with ID ${id} not found.`);
      return;
    }

    const updatedData = storedData.filter(
      (request) => request.id !== Number(id)
    );

    writeData(updatedData);

    console.log(`✅ Request with ID ${id} deleted successfully.`);
  });

export default deleteCommand;