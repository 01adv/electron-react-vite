// Expose the `electron` object in the main world (i.e. the renderer process)
// with two methods: `subscribeStatistics` and `getStaticData`.
//
// `subscribeStatistics` takes a callback function that will be called whenever
// the main process sends a message with the `statistics` channel. The callback
// function will receive the statistics object as an argument.
//
// `getStaticData` is a simple wrapper around the `ipcRenderer.invoke` method
// that allows the renderer process to request the static data from the main
// process.
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    // Listen for messages on the `statistics` channel and call the callback
    // function whenever a message is received.
    electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
