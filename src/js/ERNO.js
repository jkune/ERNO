import { Cube3D } from './3d/index.js'
import { Bluetooth } from './bluetooth/index.js';
import { Model } from './model/index.js';
import algs from './algs/index.js';
import util from './util/index.js'

class ERNO {
    constructor(options = {}) {
        this.options = options;
        this.cube3d = new Cube3D(options);
        this.bluetooth = new Bluetooth();
        this.model = new Model(this.options.size);

        this.moveCallbackBinded = this.moveCallback.bind(this);

        // On bluetooth error
        this.bluetooth.on('error',  () => {
            this.options.errorCb && typeof this.options.errorCb === 'function' && this.options.errorCb();
        });

        // On bluetooth connection
        this.bluetooth.on('connect',  () => {
            this.bluetooth.on('move', this.moveCallbackBinded);
        });

        // On bluetooth disconnection
        this.bluetooth.on('disconnect', () => {
            this.bluetooth.off('move', this.moveCallbackBinded);
            this.options.disconnectCb && typeof this.options.disconnectCb === 'function' && this.options.disconnectCb();
        });
    }

    static algs = algs;
    static util = util;

    /**
     * Render a 3D cube in DOM
     * @param {*} domElement 
     * @param {*} options 
     */
    render(domElement, options = {}) {
        return this.cube3d.render(domElement, options);
    }

    /**
     * Unrender a 3D cube from DOM
     * @param {*} key 
     */
    unrender(key) {
        return this.cube3d.unrender(key);
    }

    /**
     * Connect bluetooth cube
     * @return {Promise} connection promise
     */
    async connect() {
        return this.bluetooth.connect();
    }

    /**
     * Disconnects bluetooth cube
     */
    disconnect() {
        this.bluetooth.disconnect();
    }

    /**
     * Resize & reset model and 3D cube
     */
    async resize(size) {
        this.model.reset(size)
        await this.cube3d.cube.resize(size);
    }

    /**
     * Reset model and 3D cube
     */
    reset() {
        this.model.reset()
        this.cube3d.cube.reset();
    }

    /**
     * Calibrate bluetooth cube
     */
    calibrate() {
        this.bluetooth.calibrate();
    }

    /**
     * Bluetooth move callback
     * @param {*} move 
     */
    moveCallback(move) {
        this.options.moveCb && typeof this.options.moveCb === 'function' && this.options.moveCb(move);
        this.doTwist(move);
    }

    /**
     * Do alg from string
     * @param {String} alg 
     * @param {*} options 
     */
    doAlgorithm(alg, options = {}) {
        const converted = alg.split(' ');

        this.doTwists(converted, options);
    }

    /**
     * Prepare alg from String
     * @param {String} alg 
     */
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

    /**
     * Reset the cube and let the cube ready to solve by that alg
     * @param { Object } args 
     */
    async trainingFree(args) {
        this.model.initMethod({
            methodId: args.methodId,
            callback: args.callback,
        });
        this.model.setScrambling(false);
    }

    /**
     * Reset the cube and let the cube ready to solve by that alg
     * @param { Object } args 
     */
    async trainingAlg(args) {
        this.reset();
        await this.resize(args.size);
        this.prepareAlgorithm(args.case);
        this.model.initMethod({
            methodId: args.methodId,
            stepId: args.stepId, 
            callback: args.callback,
            baseFace: args.baseFace,
        });
        this.model.setScrambling(false);
    }

    /**
     * Do twists to our ERNO cube
     * @param {Array} twists 
     * @param {*} options 
     */
    doTwists(twists = [], options = {}) {
        twists.forEach((e) => {
            this.doTwist(e, options);
        })
    }

    /**
     * Do twist to our ERNO cube
     * @param {*} twist 
     * @param {*} options 
     */
    doTwist(twist, options = {}) {
        const myTwist = this.model.doTwist(twist);

        this.cube3d.controls.doTwist(myTwist, options);
    }
    
}

window.ERNO = ERNO;