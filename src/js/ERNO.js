import { Cube3D } from './3d/index.js'
import { Bluetooth } from './bluetooth/index.js';
import { Model } from './model/index.js';
import * as ALGORITHMS from './algs/index.js';

class ERNO {
    constructor(options = {}) {
        this.options = options;
        this.cube3d = new Cube3D(options);
        this.bluetooth = new Bluetooth();
        this.model = new Model(this.options.size);

        this.bluetooth.on('connect',  this.connectCallBack);
        this.bluetooth.on('disconnect', () => {
            this.bluetooth.off('move', this.moveCallBack);
            this.bluetooth.off('connect', this.connectCallBack);
        });
    }

    static getAlgs() {
        return ALGORITHMS;
    }

    connectCallBack() {
        this.bluetooth.on('move', this.moveCallBack);
    }

    moveCallBack(move) {
        this.doTwist(move);
    }

    doAlgorithm(alg, options = {}) {
        const converted = alg.split(' ');

        this.doTwists(converted, options);
    }

    prepareAlgorithm(alg) {
        let converted = alg.split(' ');

        converted = converted.reverse();
        converted = converted.map((e) => {
            let twist = e.charAt(0);
            let modified = e.charAt(1);
            let newModified = '';

            if (modified === '2') {
                newModified = modified
            } else if (modified == '') {
                newModified = '\'';
            }

            return twist + newModified;
        }).join(' ');
        this.doAlgorithm(converted, { duration: 0 });
    }

    doTwists(twists = [], options = {}) {
        twists.forEach((e) => {
            this.doTwist(e, options);
        })
    }

    doTwist(twist, options = {}) {
        const myTwist = this.model.doTwist(twist);

        this.cube3d.controls.doTwist(myTwist, options);
    }

    checkAnalysis() {
        this.model.checkSolve(true);
    }

    startAnalysis() {
        this.model.reset();
    }

    connect() {
        this.bluetooth.connect();
    }

    disconnect() {
        this.bluetooth.disconnect();
    }

    render(domElement, options = {}) {
        return this.cube3d.render(domElement, options);
    }

    unrender(key) {
        return this.cube3d.unrender(key);
    }
}

window.ERNO = ERNO;