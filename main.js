const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
var data;
var contents;
let win
const fs = require('fs');

function createWindow () {

  win = new BrowserWindow({ width: 800, height: 600, frame: true})
  win.loadURL('http://krunker.io')
  win.on('closed', () => {


    win = null
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (win === null) {
    createWindow()
  }


})

ipc.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg)
})

function readMods() {

    fs.readdir("./mods/", (err, files) => {
        files.forEach(file => {
            console.log(file);
            win.webContents.executeJavaScript(
                fs.readFileSync("./mods/" + file, 'utf8'
            )
            
            )
        });
    })
    
}


readMods();
