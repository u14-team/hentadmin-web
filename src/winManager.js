import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export default class WinManager {
  async create () {
    this.win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      }
    })
  }

  openPage () {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    } else {
      createProtocol('app')
      this.win.loadURL('app://./index.html')
    }
  }
}
