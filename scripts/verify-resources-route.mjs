import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "app", "resources", "resourceData.ts");
const source = fs.readFileSync(dataPath, "utf8");
const routes = [...source.matchAll(/^\s+route: "(\/resources[^"]*)",$/gm)].map((match) => match[1]);
const unique = new Set(routes);

const required = [
  "/resources",
  "/resources/edibles-guides/how-to-read-an-edibles-menu",
  "/resources/native-smokes/native-cigarettes-guide",
  "/resources/magic-mushroom-guides/magic-mushroom-formats-explained",
  "/resources/magic-mushroom-guides/how-to-read-a-magic-mushroom-menu",
];

const forbiddenRoutes = ["/resources/edibles-guides/how-long-do-edibles-take"];
const forbiddenPublicPhrases = [
  "start low and go slow",
  "full effects",
  "delayed onset",
  "currently lists native cigarette carton options",
  "current $25 carton",
  "repository",
  "generic copy",
  "search opportunity",
];

const failures = [];
if (routes.length !== 24) failures.push(`Expected 24 resource routes, found ${routes.length}.`);
if (unique.size !== routes.length) failures.push("Resource routes must be unique.");
for (const route of required) if (!unique.has(route)) failures.push(`Missing required route: ${route}`);
for (const route of forbiddenRoutes) if (unique.has(route)) failures.push(`Forbidden route remains: ${route}`);
for (const phrase of forbiddenPublicPhrases) {
  if (source.toLowerCase().includes(phrase.toLowerCase())) failures.push(`Forbidden public phrase remains: ${phrase}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`JFC resource verifier passed: ${routes.length} unique routes.`);
