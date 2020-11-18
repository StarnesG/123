const boxMix = require('../ult/ult.js').boxMix

module.exports = function (scene) {
    window.BABYLON.SceneLoader.ImportMeshAsync(null, "assets/model/haunted/", "scene.gltf", scene)
        .then((result) => {


            let parent = new window.BABYLON.Mesh("haunted", scene);
            result.meshes.forEach((element) => {
                if (element.id === '__root__') {
                    element.dispose(true, true)
                }
                element.setParent(parent)
            });
            boxMix(parent);
            parent.scaling.x = -1;
            // parent.scaling.y = 130;
            // parent.scaling.z = 130;
            parent.position.x = 3.4;
            // parent.position.z = 100;
            // parent.position.y = 2;
            // parent.rotation.y = 3*Math.PI / 4;
        })
}


