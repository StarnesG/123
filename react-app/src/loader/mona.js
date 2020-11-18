const boxMix = require('../ult/ult.js').boxMix

module.exports = function (scene) {
    window.BABYLON.SceneLoader.ImportMeshAsync(null, "assets/model/mona/", "Blender249.obj", scene)
        .then((result) => {
            var wallmt = new window.BABYLON.StandardMaterial("wallmt", scene);
            var bodymt = new window.BABYLON.StandardMaterial("bodymt", scene);
            var detail = new window.BABYLON.StandardMaterial("detail", scene);
            wallmt.diffuseTexture = new window.BABYLON.Texture("assets/model/mona/texture/Bkg_IsleworthMonaLisa.png", scene);
            bodymt.diffuseTexture = new window.BABYLON.Texture("assets/model/mona/texture/IsleworthMonaLisa00.png", scene);
            detail.diffuseTexture = new window.BABYLON.Texture("assets/model/mona/texture/IsleworthMonaLisa01.png", scene);

            result.meshes[0].material = wallmt;
            result.meshes[1].material = wallmt;
            result.meshes[2].visibility = 0;
            result.meshes[3].visibility = 0;
            result.meshes[4].material = detail;
            result.meshes[5].material = detail;
            result.meshes[6].material = bodymt;
            result.meshes[7].material = bodymt;

            let parent = new window.BABYLON.Mesh("mona", scene);
            result.meshes.forEach((element) => {
                if (element.id === '__root__') {
                    element.dispose(true, true)
                }
                element.setParent(parent)
            });
            boxMix(parent);
            // parent.scaling.x = 130;
            // parent.scaling.y = 130;
            // parent.scaling.z = 130;
            // parent.position.x = 700;
            // parent.position.z = 100;
            // parent.position.y = 120;
            // parent.rotation.y = 3*Math.PI / 4;
        })
}


