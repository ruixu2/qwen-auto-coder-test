const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

// 保持对window对象的全局引用，避免JavaScript对象被垃圾回收时，窗口被自动关闭
let mainWindow;

function createWindow() {
  // 获取屏幕尺寸
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 100,  // 窗口宽度
    height: 100, // 窗口高度
    x: Math.floor(width / 2 - 50),  // 水平居中
    y: Math.floor(height / 2 - 50), // 垂直居中
    frame: false, // 无边框窗口
    transparent: true, // 透明背景
    alwaysOnTop: true, // 始终置顶
    skipTaskbar: true, // 不在任务栏显示
    webPreferences: {
      nodeIntegration: true, // 启用Node.js集成
      contextIsolation: false // 禁用上下文隔离
    }
  });

  // 加载应用的index.html
  mainWindow.loadFile('index.html');
  
  // 禁用窗口的移动
  mainWindow.setMovable(false);

  // 当窗口关闭时调用的函数
  mainWindow.on('closed', function() {
    // 取消引用 window 对象
    mainWindow = null;
  });
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow);

// 当所有窗口关闭时退出应用
app.on('window-all-closed', function() {
  // 在macOS上，除非用户使用Cmd + Q确定地退出
  // 否则绝大部分应用会保持激活
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  // 在macOS上，当点击dock图标并且没有其他窗口打开时，
  // 通常会在应用程序中重新创建一个窗口
  if (mainWindow === null) createWindow();
});