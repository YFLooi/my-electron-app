const path = require("path");
// "app" detects app events e.g. when app is launched
// "BrowserWindow" displays html doc
const { app, BrowserWindow, ipcMain, Notification } = require("electron");

// Available options for BrowserWindow: https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions
function createWindow() {
  // Create the browser window.
  const browserWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      javascript: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      show: false,
      preload: path.join(__dirname, "preload-script.js"),
    },
  });

  // and load the index.html of the app.
  browserWindow.loadFile(path.join(__dirname, "index.html"));
  // triggers once did-finish-load is complete, unless there
  // are many remote resources to load
  // used together with webpreferences.show = false
  // Ref: https://www.electronjs.org/docs/latest/api/browser-window
  browserWindow.once("ready-to-show", () => {
    console.log(`Browser window now ready to show. Showing...`);
    browserWindow.show();
  });
}

// Ensurers createWindow() runs only after Electron has started the app
app.whenReady().then(createWindow).then(showNotification);

/**
 * https://www.twilio.com/blog/an-introduction-to-building-desktop-applications-with-electron
 * Solves  issue on some operating systems where the application still
 * remains active even after all windows have been closed
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * Ensures that the application boots up when its icon is clicked in the
 * operating system’s application dock when there are no windows open
 */
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loadMainWindow();
  }
});

// Enables native notifications for windows 10
// https://www.electronjs.org/docs/latest/tutorial/notifications
app.setAppUserModelId(process.execPath);

// Handles popup notification requests from renderer process
ipcMain.handle("show-notification", (event, ...args) => {
  console.log(`Request to show notification received. Value: \n${args[0]}`);
  showNotification(args[0]);
});
function showNotification(body) {
  if (!body) {
    body = "my-electron-app triggered";
  }

  const notification = {
    title: "New Task",
    body: `Added: ${body}`,
  };

  new Notification(notification).show();
}
