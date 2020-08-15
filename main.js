const { app, BrowserWindow, Menu } = require("electron");

// set env
process.env.NODE_ENV = "development";

// platform check
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform     === "darwin"     ? true : false;
const isWin = process.platform     === "win32"      ? true : false;


let mainWindow;
let aboutWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Image Shrinker",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: 'white',

    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      worldSafeExecuteJavaScript : true
    },
  });

  //   mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}


function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About Image Shrinker",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: 'white',

    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      worldSafeExecuteJavaScript : true
    },
  });
  aboutWindow.loadFile("./app/about.html");
}


const menu = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
  {
      role: 'fileMenu'
  },
  ...(isDev ? [
    { 
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ]
    }
]: [])
];


app.on("ready", () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
    // globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools());

    mainWindow.on('closed', () => mainWindow = null)
});


app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit();
    }
});
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
});
