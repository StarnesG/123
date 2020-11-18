module.exports = function (scene) {
    window.BABYLON.SceneLoader.ImportMeshAsync(null, "assets/model/skybox/", "skybox.gltf", scene)
        .then((result) => {
            result.meshes.forEach(element => {
                if (element.id === '__root__') {
                    element.dispose(true, true)
                }
            });
        })
}
