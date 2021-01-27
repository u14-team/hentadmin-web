'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
import TrayManager from './trayManager.js'
import WinManager from './winManager.js'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const trayManager = new TrayManager()
const winManager = new WinManager()

async function createWindow () {
  winManager.create()
  winManager.openPage()
  trayManager.setWindow(winManager.win)
  autoUpdater.checkForUpdatesAndNotify({
    title: 'Наконец-то!',
    body: 'Мы уже скачали обновление {version} и установим его как только Вы выключите приложение.'
  })

  app.whenReady().then(() => {
    trayManager.setup()
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => app.quit())
  }
}
