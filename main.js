const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        title: 'Grow Simulator MEGA',
        icon: path.join(__dirname, 'icons/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        show: false,
        backgroundColor: '#1a1a2e',
        autoHideMenuBar: true
    });

    // Load the game
    mainWindow.loadFile('index.html');

    // Show when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    // Create menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Игра',
            submenu: [
                {
                    label: 'Новая игра',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('if(confirm("Начать новую игру? Прогресс будет потерян!")){localStorage.clear();location.reload();}');
                    }
                },
                {
                    label: 'Сохранить',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('saveGame();');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Полный экран',
                    accelerator: 'F11',
                    click: () => {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                },
                {
                    label: 'Перезагрузить',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Выход',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Скорость',
            submenu: [
                {
                    label: '1x',
                    accelerator: '1',
                    click: () => mainWindow.webContents.executeJavaScript('setSpeed(1);')
                },
                {
                    label: '2x',
                    accelerator: '2',
                    click: () => mainWindow.webContents.executeJavaScript('setSpeed(2);')
                },
                {
                    label: '5x',
                    accelerator: '5',
                    click: () => mainWindow.webContents.executeJavaScript('setSpeed(5);')
                },
                {
                    label: '10x',
                    accelerator: '0',
                    click: () => mainWindow.webContents.executeJavaScript('setSpeed(10);')
                }
            ]
        },
        {
            label: 'Вид',
            submenu: [
                {
                    label: 'Масштаб 100%',
                    accelerator: 'CmdOrCtrl+0',
                    click: () => mainWindow.webContents.setZoomFactor(1)
                },
                {
                    label: 'Увеличить',
                    accelerator: 'CmdOrCtrl+Plus',
                    click: () => {
                        const factor = mainWindow.webContents.getZoomFactor();
                        mainWindow.webContents.setZoomFactor(factor + 0.1);
                    }
                },
                {
                    label: 'Уменьшить',
                    accelerator: 'CmdOrCtrl+-',
                    click: () => {
                        const factor = mainWindow.webContents.getZoomFactor();
                        mainWindow.webContents.setZoomFactor(Math.max(0.5, factor - 0.1));
                    }
                }
            ]
        },
        {
            label: 'Справка',
            submenu: [
                {
                    label: 'Гайд',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("tutorial").classList.remove("hidden");');
                    }
                },
                {
                    label: 'Горячие клавиши',
                    click: () => {
                        const keys = `
                            Горячие клавиши:
                            
                            1-5, 0 - Скорость времени
                            N - Новая игра
                            S - Сохранить
                            F11 - Полный экран
                            R - Перезагрузить
                            Ctrl+/- - Масштаб
                        `;
                        alert(keys);
                    }
                },
                { type: 'separator' },
                {
                    label: 'О программе',
                    click: () => {
                        alert('Grow Simulator MEGA v1.0\n\nГенетический симулятор выращивания\n\nСоздано с ❤️');
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);
}

// App ready
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// All windows closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Before quit - save game
app.on('before-quit', (event) => {
    if (mainWindow) {
        mainWindow.webContents.executeJavaScript('saveGame();');
    }
});