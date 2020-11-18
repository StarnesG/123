//加载相机
export   function initFaceCamera(scene,canvas, type) {
    if (type === "arc") {
        var cameraA = new window.BABYLON.ArcRotateCamera("cameraArc", 1.6, 1.5, 5.4, new window.BABYLON.Vector3(0, 2.3, 0), scene);
        scene.activeCamera=cameraA;
        // camera.attachControl(canvas, true);
    }
    else if (type === "free") {
        var cameraF = new window.BABYLON.FreeCamera("cameraFree", new window.BABYLON.Vector3(0.2, 1.5, 3.7), scene);
        cameraF.setTarget(new window.BABYLON.Vector3(0, 1, 0));
        scene.activeCamera=cameraF;
        // camera.attachControl(canvas, true);

    }
    else if (type === "flashlight") {
        scene.lights[0].intensity = 0.0005;

        var flashLight = new window.BABYLON.SpotLight("flashlight", new window.BABYLON.Vector3(0, 0.5, -3), new window.BABYLON.Vector3(0, -5, 5), Math.PI / 4.6, 0, scene);
        flashLight.intensity = 20;

        var cameraL = new window.BABYLON.FreeCamera("cameraFlashlight", new window.BABYLON.Vector3(0, 0.5, -3), scene);
        cameraL.setTarget(new window.BABYLON.Vector3(0, 0.5, 5));
        scene.activeCamera=cameraL;
        // camera.attachControl(canvas, true);

        scene.fogMode = window.BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.000001;
        scene.fogColor = new window.BABYLON.Color3(0.43, 0.11, 0.16);

    }
}
//加载摄像头
export  function faceToCamera(faceapi) {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('assets/facemodels')
    ]).then(() => {
        console.log("videoReady");
        let video = document.getElementById("myVideo");
        navigator.getUserMedia(
            { video: {} },
            stream => video.srcObject = stream,
            err => console.error(err)
        )
    })
}

//face control==ArcRotateCamera 
let getFaceByArc = async function (scene, antiShake, fpCache, faceapi, opt) {
    let video = document.getElementById("myVideo");
    //********* faceapi 获取人脸信息点 *********//
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({inputSize: 128}))
    if (detections && detections.box&&scene.activeCamera) {

        let fpoint = { x : Math.floor(detections.box.x + (detections.box.width / 2)), y : Math.floor(detections.box.y + (detections.box.height / 2))}
        //********* 防抖 *********//
        if (fpoint.x !== isNaN && fpoint.y !== isNaN) {
            antiShake.push(fpoint)
            if(antiShake.length > 250) {
                antiShake.shift()
            }
            let sumX = antiShake.reduce((arr, value) => { return arr + value.x }, 0) 
            let sumY = antiShake.reduce((arr, value) => { return arr + value.y }, 0) 
            let fx = sumX / (antiShake.length);
            let fy = sumY / (antiShake.length);
            fpoint = {x : fx, y : fy} 
        }
        //********* 平滑算法 *********//
        if (fpoint.x !== isNaN && fpoint.y !== isNaN) {
            if (fpCache.length < 5 && fpCache.length > 0) {
                let sumX = fpCache.reduce((arr, value) => { return arr + value.x }, 0) + fpoint.x;
                let sumY = fpCache.reduce((arr, value) => { return arr + value.y }, 0) + fpoint.y;
                let fx = sumX / (fpCache.length + 1);
                let fy = sumY / (fpCache.length + 1);

                //********* 互动响应灵敏度(分母越小越灵敏)*********//
                scene.activeCamera.alpha = ((fx / opt.alphaSens) + opt.alphaOffset);
                scene.activeCamera.beta = ((fy / opt.betaSens) + opt.betaOffset);

                fpCache.push(fpoint)
            }
            else if (fpCache.length === 0) {

                fpCache.push(fpoint)

            }
            else {
                fpCache.shift();
                let sumX = fpCache.reduce((arr, value) => { return arr + value.x }, 0) + fpoint.x;
                let sumY = fpCache.reduce((arr, value) => { return arr + value.y }, 0) + fpoint.y;
                let fx = sumX / (fpCache.length + 1);
                let fy = sumY / (fpCache.length + 1);

                scene.activeCamera.alpha = ((fx / opt.alphaSens) + opt.alphaOffset);
                scene.activeCamera.beta = ((fy / opt.betaSens) + opt.betaOffset);

                fpCache.push(fpoint);
            }
        }
    }
}

//face control==FreeCamera 
let getFaceByFree = async function (scene, antiShake, fpCache, faceapi, opt) {
    let video = document.getElementById("myVideo");
    //********* faceapi 获取人脸信息点 *********//
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({inputSize: 128}))

    if (detections && detections.box&&scene.activeCamera) {

        let fpoint = { x : Math.floor(detections.box.x + (detections.box.width / 2)), y : Math.floor(detections.box.y + (detections.box.height / 2))}
        //********* 防抖 *********//
        if (fpoint.x !== isNaN && fpoint.y !== isNaN) {
            antiShake.push(fpoint)
            if(antiShake.length > 250) {
                antiShake.shift()
            }
            let sumX = antiShake.reduce((arr, value) => { return arr + value.x }, 0) 
            let sumY = antiShake.reduce((arr, value) => { return arr + value.y }, 0) 
            let fx = sumX / (antiShake.length);
            let fy = sumY / (antiShake.length);
            fpoint = {x : fx, y : fy} 
        }
        //********* 平滑算法 *********//
        if (fpoint.x !== isNaN && fpoint.y !== isNaN) {
            if (fpCache.length < 7 && fpCache.length > 0) {
                let sumX = fpCache.reduce((arr, value) => { return arr + value.x }, 0) + fpoint.x;
                let sumY = fpCache.reduce((arr, value) => { return arr + value.y }, 0) + fpoint.y;
                let fx = sumX / (fpCache.length + 1);
                let fy = sumY / (fpCache.length + 1);

                //********* 互动响应灵敏度(分母越小越灵敏)*********//
                scene.activeCamera.setTarget(new window.BABYLON.Vector3(((fx / opt.XSens) + opt.XOffset), ((fy / opt.YSens) + opt.YOffset), 0));
                fpCache.push(fpoint)
            }
            else if (fpCache.length === 0) {
                fpCache.push(fpoint)
            }
            else {
                fpCache.shift();
                let sumX = fpCache.reduce((arr, value) => { return arr + value.x }, 0) + fpoint.x;
                let sumY = fpCache.reduce((arr, value) => { return arr + value.y }, 0) + fpoint.y;
                let fx = sumX / (fpCache.length + 1);
                let fy = sumY / (fpCache.length + 1);

                scene.activeCamera.setTarget(new window.BABYLON.Vector3(((fx / opt.XSens) + opt.XOffset), ((fy / opt.YSens) + opt.YOffset), 0));
                fpCache.push(fpoint);
            }

        }

    }
}

//face control==FreeCamera & FlashLight 
let getFaceByFlashlight = async function (scene, antiShake, fpCache, faceapi, opt,) {
    let video = document.getElementById("myVideo");
    //********* faceapi 获取人脸信息点 *********//
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({inputSize: 128}))

    if (detections && detections.box&&scene.activeCamera) {

        let fpoint = { x : Math.floor(detections.box.x + (detections.box.width / 2)), y : Math.floor(detections.box.y + (detections.box.height / 2))}
        //********* 防抖 *********//
        if (fpoint.x !== isNaN && fpoint.y !== isNaN) {
            antiShake.push(fpoint)
            if(antiShake.length > 250) {
                antiShake.shift()
            }
            let sumX = antiShake.reduce((arr, value) => { return arr + value.x }, 0) 
            let sumY = antiShake.reduce((arr, value) => { return arr + value.y }, 0) 
            let fx = sumX / (antiShake.length);
            let fy = sumY / (antiShake.length);
            fpoint = {x : fx, y : fy} 
        }
        //********* 平滑算法 *********//
        if (fpoint.x !== isNaN && fpoint.y !== isNaN) {
            if (fpCache.length < 7 && fpCache.length > 0) {
                let sumX = fpCache.reduce((arr, value) => { return arr + value.x }, 0) + fpoint.x;
                let sumY = fpCache.reduce((arr, value) => { return arr + value.y }, 0) + fpoint.y;
                let fx = sumX / (fpCache.length + 1);
                let fy = sumY / (fpCache.length + 1);

                //********* 互动响应灵敏度(分母越小越灵敏)*********//
                scene.activeCamera.setTarget(new window.BABYLON.Vector3(((fx / opt.XSens) + opt.XOffset), ((fy / opt.YSens) + opt.YOffset), 5));
                scene.lights[1].direction.x = ((fx / opt.XSens) + opt.XOffset);
                scene.lights[1].direction.y = ((fy / opt.YSens) + opt.YOffset);
                fpCache.push(fpoint)
            }
            else if (fpCache.length === 0) {
                fpCache.push(fpoint)
            }
            else {
                fpCache.shift();
                let sumX = fpCache.reduce((arr, value) => { return arr + value.x }, 0) + fpoint.x;
                let sumY = fpCache.reduce((arr, value) => { return arr + value.y }, 0) + fpoint.y;
                let fx = sumX / (fpCache.length + 1);
                let fy = sumY / (fpCache.length + 1);

                //********* 互动响应灵敏度(分母越小越灵敏)*********//

                scene.activeCamera.setTarget(new window.BABYLON.Vector3(((fx / opt.XSens) + opt.XOffset), ((fy / opt.YSens) + opt.YOffset), 5));
                scene.lights[1].direction.x = ((fx / opt.XSens) + opt.XOffset);
                scene.lights[1].direction.y = ((fy / opt.YSens) + opt.YOffset);
                fpCache.push(fpoint);
            }

        }

    }
}

export  function getFace (type, scene, antiShake, fpCache, faceapi, opt) {
    if(type==='arc'){
        getFaceByArc(scene, antiShake, fpCache, faceapi, opt)
    }
    else if(type==='free'){
        getFaceByFree(scene, antiShake, fpCache, faceapi, opt)
    }
    else if(type==='flashlight'){
        getFaceByFlashlight(scene, antiShake, fpCache, faceapi, opt)
    }
    
}
