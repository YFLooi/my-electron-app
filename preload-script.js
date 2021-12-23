const { contextBridge, ipcRenderer } = require("electron");

// Based on contextBridge. This ensures only some APIs are exposed
// to the renderer
// https://www.electronjs.org/docs/latest/api/context-bridge#exposing-node-global-symbols
contextBridge.exposeInMainWorld("electron", {
  showNotification: (taskName) =>
    ipcRenderer.invoke("show-notification", taskName),
});
