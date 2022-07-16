const electron = require('electron');
const fs = require('fs');
const path = require('path');

const app = electron.app || electron.remote.app;


// const pathToOutDir = path.join(__dirname, '../../../../../../../../../../../out');
// const pathToMacOSDir = path.join(pathToOutDir, '/cloud-data-darwin-x64');
// const pathToMacOSExe = path.join(pathToMacOSDir, '/cloud-data.app/Contents/MacOS/cloud-data');




const pathToNewVersion = path.join(__dirname, '../../../../../../../../cloud-data-darwin-x64_new');
const pathToMacOSExe = path.join(pathToNewVersion, '/cloud-data.app/Contents/MacOS/cloud-data');

export function isUpdateDownloaded() {
    if (fs.existsSync(pathToNewVersion)) {
        return fs.existsSync(pathToMacOSExe);
    }
    return false;
}

export function installUpdate() {
    const childProcess = require('child_process');
    childProcess.execFile(pathToMacOSExe);
    const exePath = getRoot();

    fs.rmdirSync(exePath, { recursive: true }, err => {
        if (err) throw err;
    });
    fs.rename(pathToNewVersion, exePath, err => {
        if (err) throw err;
    });
    app.exit();
}

function getRoot() {
    if (process.platform === 'darwin' ) {
      return path.dirname(path.join(app.getPath('exe'), '/../../../' ));
    }  else {
      return path.dirname(app.getPath('exe'));
    }
  }
