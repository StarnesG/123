module.exports = function () {
    var advancedTexture = window.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button1 = window.GUI.Button.CreateSimpleButton("but1", "Click Me");
    button1.width = "10%"
    button1.height = "4%";
    button1.color = "white";
    button1.alpha =0.6;
    button1.top ='42%';
    button1.cornerRadius = 30;
    button1.background = "#333333";
    advancedTexture.addControl(button1);

    return button1
}