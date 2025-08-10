import osUtils from "os-utils";
import os from "os";
const POLLING_INTERVAL = 500;

export function pollResource() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    // const storageData = getStorageData();
    console.log(`CPU usage: ${cpuUsage}, RAM usage: ${ramUsage}`);
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const cpuModel = os.cpus()[0].model;
  const totalMemory = Math.floor(os.totalmem() / 1024 / 1024);

  return {
    cpuModel,
    totalMemory,
  };
}

function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  //   return new Promise((resolve) => {
  return 1 - osUtils.freememPercentage();
  //   });
}

// function getStorageData() {
//   const stats = fs.statSync(process.platform === "win32" ? "C://" : "/");
//   const total = stats.blksize * stats.blocks;
//   const free = stats.blksize * stats.blocks - stats.size;

//   return {
//     total: Math.floor(total / 1024 / 1024),
//     usage: Math.floor((total - free) / 1024 / 1024),
//   };
// }
