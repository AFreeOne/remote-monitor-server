const screenshot = require('screenshot-desktop')
const configuration = require('./Configuration').getInstance();

const SCREENSHOT_INTERVAL = configuration.getConfig('monitor.screenshotInterval');

export const createScreenshot = (): Promise<[string, Buffer]> => {
    return screenshot({format: 'png'}).then((img): [string, Buffer] => {
        return [ img.toString('base64'), img];
    }).catch((err): {} => {
        console.log('截图失败', err);
        return err;
    })
}

export const startScreenshotTimer = (callback): {} => {
    return setInterval((): void => {
        createScreenshot().then(([imgStr, img]): void => {
            callback(['data:image/png;base64,' + imgStr, img]);
        })
    }, SCREENSHOT_INTERVAL)
}
