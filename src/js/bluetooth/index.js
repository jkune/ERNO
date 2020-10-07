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
    async reset() {
        await this.services.reset();
        console.log('reset done!');
    }

    /**
     * Connects to the device throught the Bluetooth system
     */
    async connect() {
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

            this.services = await cube.getServices()
            this._device.addEventListener('gattserverdisconnected', this.disconnectHandlerBlinded);
            await this.refreshBatteryLevel();
            this.triggerHandler('connect', this.services.getInfo(), cube.skin);
            this.loopRead();
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
     * Gan cube characteristic loop poll
     */
    async loopRead() {
        if (!this._device) {
            return;
        }

        var twistPromise = this.services.getNewTwists().then((twists) => {
            for (var i = 0; i < twists.length; i++) {
                this.triggerHandler('move', twists[i]);
            }
        });

        try {
            await Promise.all([this.refreshBatteryLevel, twistPromise]);
        } catch (ex) {
            this.triggerHandler('error', ex)
        }

        await this.loopRead();
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
