import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getStaticData, pollResource } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

// Called when Electron has finished initializing
app.on("ready", () => {
  // Create the main window
  const mainWindow = new BrowserWindow({
    // Enable Node.js integration
    webPreferences: {
      // Use the preload script to expose the Node.js API
      preload: getPreloadPath(),
    },
  });

  // Load the main window content
  if (isDev()) {
    // Load the dev server
    mainWindow.loadURL("http://localhost:5000");
  } else {
    // Load the production build
    mainWindow.loadFile(
      // Path to the production build
      path.join(app.getAppPath() + "/dist-react/index.html")
    );
  }

  // Start polling for resource usage
  pollResource(mainWindow);

  // Handle IPC requests for static data
  ipcMain.handle("getStaticData", async () => {
    // Return the static data
    return getStaticData();
  });
});
