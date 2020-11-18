const fcConfig = require('./ult/loadFCconfig.js')


let loader = function (scene,name) {
    let assetFolder = fcConfig.changeC(name).model
    let loadScript=require('./loader/' + assetFolder + '.js')
    loadScript(scene)
}

module.exports = loader