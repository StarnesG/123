module.exports = function (scene, canvas) {
    //light
    new window.BABYLON.HemisphericLight("light", new window.BABYLON.Vector3(0, 1, 0), scene);

    //basic camera
    let cameraB = new window.BABYLON.FreeCamera("MenuCamera", new window.BABYLON.Vector3(10, 10, 10), scene);
    cameraB.setTarget(new window.BABYLON.Vector3(0, 0, 0));
    cameraB.attachControl(canvas, true);

}