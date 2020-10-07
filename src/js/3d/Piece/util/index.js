import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const cache = {}
const MODELS_FOLDER = 'assets/model/';

async function loadModel(url) {
    const file = MODELS_FOLDER + url;
    return new Promise((resolve) => {
        if (cache.hasOwnProperty(file))
            return resolve(getModel(cache[file]));

        const loader = new GLTFLoader();

        loader.load(file, (model) => {
            cache[file] = model;
            resolve(getModel(model));
        });
    })
}

function getModel(model) {
    const clone = model.scene.children[2].clone();

    clone.material = clone.material.clone();

    return clone;
}

export {
    loadModel,
}
