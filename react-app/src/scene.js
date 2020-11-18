import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui';
import "@babylonjs/loaders/"
import React, { useEffect, useRef, useState } from 'react'
import "./App.css";
import load from './load';
import init from './init';
// import { showAxis } from './ult/ult.js';
import theButton from './ult/theButton';
import desk from './ult/desk';
import { initFaceCamera, faceToCamera, getFace } from './ult/loadFaceCamera.js';
import * as faceapi from 'face-api.js';
const fcConfig = require('./ult/loadFCconfig.js');
const button = require('./ult/buttonSelect.js');
window.BABYLON = BABYLON;
window.GUI = GUI;
faceToCamera(faceapi);


export default (props) => {
    const reactCanvas = useRef(null);
    const getfacevideo = useRef(null);
    const [name, setName] = useState('mona');
    const [forname, setFname] = useState(0);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, faceData, ...rest } = props;
    var facePointCache = [];
    var antiShake = [];

    const onSceneReady = scene => {
        load(scene, name)
        init(scene, reactCanvas.current)//set type
        desk();
        theButton();
        theButton().onPointerClickObservable.add(function () {
            setFname(forname + 1);
            let n = ((forname + 1) % button.name.length);
            setName(button.name[n]);
        });
        // theButton().onPointerClickObservable.add(async () => {
        //     await setFname(forname + 1);
        // }, setName(button.name[forname % button.name.length])
        // );
        initFaceCamera(scene, reactCanvas.current, fcConfig.changeC(name).faceCamera.type)
        // showAxis(10, scene)
    }
    const onRender = scene => {
        getFace(
            fcConfig.changeC(name).faceCamera.type,
            scene,
            antiShake,
            facePointCache,
            faceapi,
            fcConfig.changeC(name).faceCamera.opt,
        )
    }

    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new BABYLON.Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new BABYLON.Scene(engine, sceneOptions);
            if (scene.isReady()) {
                onSceneReady(scene);
            } else {
                scene.onReadyObservable.addOnce(scene => onSceneReady(scene));
            }
            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
            })

            const resize = () => {
                scene.getEngine().resize();
            }

            if (window) {
                window.addEventListener('resize', resize);
                window.bmyScene = scene
            }

            return () => {
                scene.getEngine().dispose();
                if (window) {
                    window.removeEventListener('resize', resize);
                    delete window.bmyScene
                }
            }
        }
    }, [reactCanvas, name])

    return (
        <div id="renderOuter">
            <video ref={getfacevideo} id="myVideo" width="1280px" height="720px" autoPlay="autoplay"></video>
            <canvas ref={reactCanvas} {...rest} id='renderCanvas'></canvas>
        </div>
    );
}