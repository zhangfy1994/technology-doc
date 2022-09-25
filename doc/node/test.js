import {
  readFile,
  writeFile,
  appendFile,
  copyFile,
  rm,
  mkdir,
  readdir,
  cp,
  stat,
  rmdir,
  access,
  constants,
} from "node:fs/promises";
import fs from "node:fs";
import qs from "node:querystring";
import util from "node:util";
import http from "node:http";
import zlib from "node:zlib";
import path, { resolve } from "node:path";
import { fileURLToPath, parse } from "node:url";
import puppeteer from "puppeteer";
import $ from "cheerio";
import process from "node:process";
import { spawn, exec, execFile } from "child_process";
import readline from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setTimeout(() => {
  console.log("s1");
}, 0);

Promise.resolve().then(() => {
  console.log("p1");
});

console.log("start");

process.nextTick(() => {
  console.log("tick");
});

setImmediate(() => {
  console.log("st");
});

console.log("end");
