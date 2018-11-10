const shortIdLib = require('shortid');
shortIdLib.worker((Number(process.env.BUILD_NUMBER) || 0) % 16);

export function generate() {
    return shortIdLib.generate();
}
