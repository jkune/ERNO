import { CUBES } from './cubes/index.js';

class Bluetooth {

    constructor() {
        this.services = {};
        this._triggers = [];
        this._device = null;
        this._batteryLevel = null;
        this.disconnectHandlerBlinded = this.disconnectHandler.bind(this);
    }


    /**
     * Storages the event as a callback
     */
    on(event, callback) {
        if (!this._triggers[event])
            this._triggers[event] = [];
        this._triggers[event].push(callback);
    }

    /**
     * Deletes the callback event previously storaged
     */
    off(event, callback) {
        let array = this._triggers[event] || [];
        let index = array.indexOf(callback);

        if (index === -1)
            return;
            
        this._triggers[event].splice(index, 1);
    }

    /**
     * Returns true if is connected. False otherwise
     */
    isConnected() {
        return this._device ? true : false;
    }

    /**
     * If connected, disconnects the device
     */
    disconnect() {
        if (this.isConnected())
            this._device.gatt.disconnect();
    }

    /**
     * Resets the cube status
     */
    async calibrate() {
        await this.services.calibrate();
        console.log('Calibrate done!');
    }

    /**
     * Connects to the device throught the Bluetooth system
     */
    async connect() {
        if (this.isConnected()) return this.triggerHandler('error', 'Already connected');

        try {
            this._device = await window.navigator.bluetooth.requestDevice({
                filters: CUBES.map(cube => cube.filters),
                optionalServices: CUBES.reduce((t, cube) => {
                    t = t.concat(cube.optionalServices);
                    return t;
                }, [])
            });

            let server = await this._device.gatt.connect();
            let cube = CUBES.find(cube => {
                return server.device.name.startsWith(cube.filters.namePrefix);
            })

            this.services = await cube.getServices(server);

            this._device.addEventListener('gattserverdisconnected', this.disconnectHandlerBlinded);
            this.triggerHandler('connect', this.services.getInfo());
            
            this.loopBatteryRead();
            this.loopMoveRead();
        } catch (ex) {
            this._device = null;
            this.triggerHandler('error', ex);
            console.error(ex)
        }
    }

    /**
     * Returns the current battery level
     */
    getBatteryLevel() {
        return this._batteryLevel;
    }

    /**
     * Refreshes the current battery level value
     */
    async refreshBatteryLevel() {
        var batteryLevel = await this.services.getBatteryLevel();
        var initial = this._batteryLevel == null;

        if (batteryLevel != this._batteryLevel) {
            this._batteryLevel = batteryLevel;

            if (!initial)
                this.triggerHandler('batteryChanged', this._batteryLevel);
        }
    }

    /**
     * Gan cube move characteristic loop poll
     */
    async loopMoveRead() {
        if (!this._device) {
            return;
        }

        try {
            await this.services.getNewTwists().then((twists) => {
                for (var i = 0; i < twists.length; i++) {
                    this.triggerHandler('move', twists[i]);
                }
            });
        } catch (ex) {
            this.triggerHandler('error', ex)
        }

        await this.loopMoveRead();
    }

    /**
     * Gan cube battery characteristic loop poll
     */
    async loopBatteryRead() {
        if (!this._device) {
            return;
        }

        try {
            await this.refreshBatteryLevel();
        } catch (ex) {
            this.triggerHandler('error', ex)
        }

        await new Promise((resolve) => {window.setTimeout(resolve,60000)});
        await this.loopBatteryRead();
    }

    /**
     * Device disconnection event
     * @param  {...any} args 
     */
    disconnectHandler(...args) {
        if (this._device)
            this._device.removeEventListener('gattserverdisconnected', this.disconnectHandlerBlinded);
        this._device = null;
        this.triggerHandler('disconnect', ...args);
    }

    /**
     * Executes all the storaged callbacks with that event name
     * @param {string} event 
     * @param  {...any} args 
     */
    triggerHandler(event, ...args) {
        if (this._triggers[event]) {
            for (let callback of this._triggers[event]) {
                callback(...args);
            }
        }
    }
}

export { Bluetooth };
