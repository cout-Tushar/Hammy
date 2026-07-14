#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import explainCommand from "./commands/explain.js";
import runCommand from "./commands/run.js";
import helpCommand from "./commands/help.js";
import saveCommand from "./commands/save.js";
import deleteCommand from "./commands/delete.js";
import editCommand from "./commands/edit.js";
import generateCommand from "./commands/generate.js";
import listCommand from "./commands/list.js";
import reviewCommand from "./commands/review.js";
import collectionCommand from "./commands/collection.js";
import docsCommand from "./commands/docs.js";
import auditCommand from "./commands/audit.js";

const program = new Command();
program
  .name("hammy")
  .description("AI-powered API testing tool")
  .version("1.0.1");

program.addCommand(docsCommand);
program.addCommand(helpCommand);
program.addCommand(runCommand);
program.addCommand(saveCommand);
program.addCommand(deleteCommand);
program.addCommand(editCommand);
program.addCommand(generateCommand);
program.addCommand(listCommand);
program.addCommand(reviewCommand);
program.addCommand(explainCommand);
program.addCommand(collectionCommand);
program.addCommand(auditCommand);

program.parse();