#!/usr/bin/env node
import * as fs from "fs";
import minimist = require("minimist");
import {VersionHandler} from "../lib/VersionHandler";
import {VersionSourceCurseForge} from "../lib/VersionSourceCurseForge";

// Process CLI args
const args = minimist(process.argv.slice(2));
if (args.help || args._.length !== 1) {
  process.stdout.write(`cyclops-version-detector Detects new Cyclops mod versions
Usage:
  cyclops-version-detector /path/to/mods.json
Options:
  --help        print this help message
`);
  process.exit(1);
}

async function run() {
  // Load config
  const config = JSON.parse(fs.readFileSync(args._[0], "utf8"));
  const handler = new VersionHandler(config, new VersionSourceCurseForge());

  // Execute runner
  await handler.run();
}

run().catch((e) => {
  // tslint:disable-next-line:no-console
  console.error(e);
  process.exit(1);
});
