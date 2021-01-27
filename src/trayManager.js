import { app, Menu, Tray } from 'electron'

export default class TrayManager {
  setWindow (win) {
    this.win = win
  }

  setup () {
    this.tray = new Tray('build/icon.png')
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Открыть',
        click: () => this.win.show()
      },
      {
        label: 'Выход',
        click: function () {
          app.isQuiting = true
          app.quit()
        }
      }
    ])

    this.tray.setToolTip('HentAdmin')
    this.tray.setContextMenu(contextMenu)

    this.tray.on('click', () => this.win.show())

    this.win.on('minimize', event => {
      event.preventDefault()
      this.win.hide()
      this.tray.displayBalloon({
        title: 'Я здесь',
        content: 'HAc автоматически перемещается в трей, когда Вы скрываете окно.'
      })
    })
  }
}
