const path = require("path");
// "app" detects app events e.g. when app is launched
// "BrowserWindow" displays html doc
const { app, BrowserWindow } = require("electron");

// Available options for BrowserWindow: https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Since we're using nodejs
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);

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
