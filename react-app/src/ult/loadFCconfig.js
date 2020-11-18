// const sceneType = 'vango'
// const loadConfig = require('../faceCameraConfig/' + sceneType + '-config' + '.js')
// module.exports = {
//     loadConfig,
// }

export function changeC(name){
    const sceneType = name
    const loadConfig = require('../faceCameraConfig/' + sceneType + '-config' + '.js')
    return loadConfig
}

