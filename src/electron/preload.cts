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
  subscribeStatistics: (callback) =>
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
