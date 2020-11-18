module.exports = function () {
    var advancedTexture = window.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
 
    var grid = new window.GUI.Grid();
    advancedTexture.addControl(grid);

    var im1 = new window.GUI.Image("im1", "assets/model/desk/aa.png");
    im1.width = 1;
    im1.height = 1;
    // im1.left = "-26.8%";
    im1.stretch = window.GUI.Image.STRETCH_FILL;
    grid.addControl(im1, 0, 0);

}