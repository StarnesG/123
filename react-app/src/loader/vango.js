const boxMix = require('../ult/ult.js').boxMix

module.exports = function (scene) {
    window.BABYLON.SceneLoader.ImportMeshAsync(null, "assets/model/vango/", "Blender249.obj", scene)
        .then((result) => {
            var table = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var chair = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var bed = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var wall = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var door = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var hair = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var rwindow = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var lwindow = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var pic = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var woof = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var floor = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var rwd = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var lwd = new window.BABYLON.StandardMaterial("myMaterial", scene);
            var out = new window.BABYLON.StandardMaterial("myMaterial", scene);
            table.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/table.jpg", scene);
            chair.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/chair1.jpg", scene);
            bed.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/belye.jpg", scene);
            wall.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/wall1.jpg", scene);
            door.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/doors1.jpg", scene);
            hair.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/veshalka.jpg", scene);
            rwindow.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/win_right.jpg", scene);
            lwindow.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/win_left.jpg", scene);
            pic.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/wall_staff.jpg", scene);
            woof.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/rest.jpg", scene);
            floor.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/floor1.jpg", scene);
            rwd.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/glass_right.png", scene);
            lwd.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/glass_left.png", scene);
            out.diffuseTexture = new window.BABYLON.Texture("assets/model/vango/texture/Alyscamps_Arles_dos.jpg", scene);

            result.meshes[0].material = rwindow;
            result.meshes[1].material = rwindow;
            result.meshes[2].material = lwindow;
            result.meshes[3].material = lwindow;
            result.meshes[4].material = woof;
            result.meshes[5].material = woof;
            result.meshes[6].material = pic;
            result.meshes[7].material = pic;
            result.meshes[8].material = hair;
            result.meshes[9].material = hair;
            result.meshes[10].material = table;
            result.meshes[11].material = table;
            result.meshes[12].material = chair;
            result.meshes[13].material = chair;
            result.meshes[14].material = chair;
            result.meshes[15].material = chair;
            result.meshes[16].material = bed;
            result.meshes[17].material = bed;
            result.meshes[18].material = bed;
            result.meshes[19].material = bed;
            result.meshes[20].material = wall;
            result.meshes[21].material = wall;
            result.meshes[22].material = lwd;
            result.meshes[23].material = rwd;
            result.meshes[24].material = out;
            result.meshes[25].material = door;
            result.meshes[26].material = door;
            result.meshes[27].material = floor;

            let parent = new window.BABYLON.Mesh("vango", scene);
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
            // parent.position.x = 700;
            // parent.position.z = 100;
            // parent.position.y = 120;
            // parent.rotation.y = 3*Math.PI / 4;
        })
}


