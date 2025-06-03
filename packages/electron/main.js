require('dotenv').config()
const { app, BrowserWindow, nativeImage, protocol, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const http = require('http')

// Set NODE_ENV to 'development' if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// تنظیمات اولیه auto-updater
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

// رویدادهای auto-updater
autoUpdater.on('checking-for-update', () => {
    console.log('در حال بررسی برای آپدیت جدید...')
})

autoUpdater.on('update-available', (info) => {
    console.log('آپدیت جدید در دسترس است:', info)
    dialog.showMessageBox({
        type: 'info',
        title: 'به‌روزرسانی جدید',
        message: 'نسخه جدیدی از برنامه در دسترس است. در حال دانلود...',
        buttons: ['باشه']
    })
})

autoUpdater.on('update-not-available', (info) => {
    console.log('آپدیت جدیدی موجود نیست')
})

autoUpdater.on('error', (err) => {
    console.error('خطا در به‌روزرسانی:', err)
    dialog.showErrorBox('خطا در به‌روزرسانی', 'مشکلی در به‌روزرسانی برنامه پیش آمده است.')
})

autoUpdater.on('download-progress', (progressObj) => {
    let message = `سرعت دانلود: ${progressObj.bytesPerSecond} - دانلود شده: ${progressObj.percent}%`
    console.log(message)
})

autoUpdater.on('update-downloaded', (info) => {
    console.log('آپدیت دانلود شد:', info)
    dialog.showMessageBox({
        type: 'info',
        title: 'به‌روزرسانی آماده است',
        message: 'نسخه جدید دانلود شده است. برای نصب آن برنامه را مجدداً راه‌اندازی کنید.',
        buttons: ['راه‌اندازی مجدد', 'بعداً']
    }).then((returnValue) => {
        if (returnValue.response === 0) {
            autoUpdater.quitAndInstall()
        }
    })
})

let mainWindow;

function waitForViteServer(url, retries = 10, interval = 1000) {
    return new Promise((resolve, reject) => {
        const checkServer = () => {
            http.get(url, (res) => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    console.log('checkViteServer error')
                    retryOrFail();
                }
            }).on('error', retryOrFail);
        };

        const retryOrFail = () => {
            if (retries > 0) {
                console.log('checkViteServer retries', retries)
                retries--;
                setTimeout(checkServer, interval);
            } else {
                console.log('checkViteServer failed')
                reject(new Error('Failed to connect to Vite server'));
            }
        };

        checkServer();
    });
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

function createProtocol() {
    protocol.registerFileProtocol('app', (request, callback) => {
        const url = request.url.substring(6)
        callback(path.normalize(`${__dirname}/public/${url}`))
    })
}

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false // این گزینه برای تست است، در محیط production باید false باشد
        },
        icon: path.join(__dirname, 'public', 'logos', 'madar.png')
    })
    mainWindow.loadFile(path.join(__dirname, 'public', 'loading.html'))

    if (process.platform == 'darwin') {
        const icon = nativeImage.createFromPath(path.join(__dirname, 'public', 'logos', 'madar.ico'))
    }

    if (process.env.NODE_ENV === 'development') {
        try {
            await waitForViteServer('http://localhost:5173');
            await mainWindow.loadURL('http://localhost:5173');
        } catch (error) {
            mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'))
            console.error('Error loading URL:', error);
        }
    } else {
        // بررسی آپدیت در حالت production
        autoUpdater.checkForUpdates().catch(err => {
            console.error('خطا در بررسی آپدیت:', err)
        })
        mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'))
    }

    mainWindow.webContents.setZoomFactor(0.75)
    mainWindow.maximize()

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createProtocol()
    createWindow()
})

// macOS
app.on('window-all-closed' , () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

// macOS
app.on('activate', () => {
    if(mainWindow === null){
        createWindow()
    }
})

// before quit application
app.on('will-quit', () => {
    console.log('i havent written this block yet')
})