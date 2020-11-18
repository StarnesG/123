//mesh boundingbox整合工具
let boxMix = function (parent) {
  let childMeshes = parent.getChildMeshes();
  let min, max
  if (childMeshes.length > 0) {
    min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
    max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
  }

  childMeshes.forEach((it, idx) => {
    let meshMin = it.getBoundingInfo().boundingBox.minimumWorld;
    let meshMax = it.getBoundingInfo().boundingBox.maximumWorld;
    min = window.BABYLON.Vector3.Minimize(min, meshMin);
    max = window.BABYLON.Vector3.Maximize(max, meshMax);
  })
  parent.setBoundingInfo(new window.BABYLON.BoundingInfo(min, max));
  //set pivot to center of the boundingBox
  parent.setPivotPoint(window.BABYLON.Vector3.Center(min, max))
}

//Show World Axes
var showAxis = function (size, scene) {
  var makeTextPlane = function (text, color, size) {
    var dynamicTexture = new window.BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
    var plane = new window.BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new window.BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backcameraulling = false;
    plane.material.specularColor = new window.BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
  };

  var axisX = window.BABYLON.Mesh.CreateLines("axisX", [
    new window.BABYLON.Vector3.Zero(), new window.BABYLON.Vector3(size, 0, 0), new window.BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new window.BABYLON.Vector3(size, 0, 0), new window.BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ], scene);
  axisX.color = new window.BABYLON.Color3(1, 0, 0);
  var xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new window.BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
  var axisY = window.BABYLON.Mesh.CreateLines("axisY", [
    new window.BABYLON.Vector3.Zero(), new window.BABYLON.Vector3(0, size, 0), new window.BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
    new window.BABYLON.Vector3(0, size, 0), new window.BABYLON.Vector3(0.05 * size, size * 0.95, 0)
  ], scene);
  axisY.color = new window.BABYLON.Color3(0, 1, 0);
  var yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new window.BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
  var axisZ = window.BABYLON.Mesh.CreateLines("axisZ", [
    new window.BABYLON.Vector3.Zero(), new window.BABYLON.Vector3(0, 0, size), new window.BABYLON.Vector3(0, -0.05 * size, size * 0.95),
    new window.BABYLON.Vector3(0, 0, size), new window.BABYLON.Vector3(0, 0.05 * size, size * 0.95)
  ], scene);
  axisZ.color = new window.BABYLON.Color3(0, 0, 1);
  var zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new window.BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};


module.exports = {
  boxMix: boxMix,
  showAxis: showAxis,
}