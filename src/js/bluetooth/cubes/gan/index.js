import { aes128 } from './aes128/index.js';
import { LZString } from './lzstring/index.js';
import { TURNS } from '../../../util/index.js';
import * as GAN from '../../../3d/skins/gan/index.js'

const skin = GAN;
const turns = [
    TURNS.U, 
    null, 
    TURNS.INVERSE_U, 
    TURNS.R, 
    null, 
    TURNS.INVERSE_R, 
    TURNS.F,
    null,
    TURNS.INVERSE_F, 
    TURNS.D, 
    null, 
    TURNS.INVERSE_D, 
    TURNS.L, 
    null,
    TURNS.INVERSE_L, 
    TURNS.B, 
    null, 
    TURNS.INVERSE_B
];
const GAN_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const GAN_TWIST_CHARACTERISTIC_UUID = '0000fff5-0000-1000-8000-00805f9b34fb'; 
const GAN_BATTERY_CHARACTERISTIC_UUID = '0000fff7-0000-1000-8000-00805f9b34fb';
const GAN_STATUS_CHARACTERISTIC_UUID = '0000fff2-0000-1000-8000-00805f9b34fb';
const GAN_SERVICE_UUID_META = '0000180a-0000-1000-8000-00805f9b34fb';
const GAN_CHARACTERISTIC_VERSION = '00002a28-0000-1000-8000-00805f9b34fb';
const GAN_CHARACTERISTIC_UUID_HARDWARE = '00002a23-0000-1000-8000-00805f9b34fb';
const GAN_ENCRYPTION_KEYS = [
    'NoRgnAHANATADDWJYwMxQOxiiEcfYgSK6Hpr4TYCs0IG1OEAbDszALpA',
    'NoNg7ANATFIQnARmogLBRUCs0oAYN8U5J45EQBmFADg0oJAOSlUQF0g'
];
const commands = {
    reset: new Uint8Array([0x00, 0x00, 0x24, 0x00, 0x49, 0x92, 0x24, 0x49, 0x6d, 0x92, 0xdb, 0xb6, 0x49, 0x92, 0xb6, 0x24, 0x6d, 0xdb]),
};

const filters = { namePrefix: "GAN-" };
const optionalServices = [ GAN_SERVICE_UUID, GAN_SERVICE_UUID_META ];

async function getServices(server) {
    let _decoder = null;
    let _lastCount = -1;
    let _info = {
        name: '',
        version: '',
        hardware: '',
        skin: skin,
    }

    let meta = await server.getPrimaryService(GAN_SERVICE_UUID_META);
    let versionCharacteristic = await meta.getCharacteristic(GAN_CHARACTERISTIC_VERSION);
    let versionValue = await versionCharacteristic.readValue();
    let version = versionValue.getUint8(0) << 16 | versionValue.getUint8(1) << 8 | versionValue.getUint8(2);

    if (version > 0x010007 && (version & 0xfffe00) == 0x010000) {
        let hardwareCharacteristic = await meta.getCharacteristic(GAN_CHARACTERISTIC_UUID_HARDWARE);
        let hardwareValue = await hardwareCharacteristic.readValue();
        let key = getKey(version, hardwareValue);

        _decoder = new aes128(key);
    }

    let cubeService = await server.getPrimaryService(GAN_SERVICE_UUID);
    let cubeTwistCharacteristic = await cubeService.getCharacteristic(GAN_TWIST_CHARACTERISTIC_UUID);
    let cubeBatteryCharacteristic = await cubeService.getCharacteristic(GAN_BATTERY_CHARACTERISTIC_UUID);
    let cubeStatusCharacteristic = await cubeService.getCharacteristic(GAN_STATUS_CHARACTERISTIC_UUID);

    return {
        getInfo: () => {
            return _info;
        },
        reset: async () => {
            await cubeStatusCharacteristic.writeValue(commands.reset);
        },
        getBatteryLevel: async () => {
            let value = await cubeBatteryCharacteristic.readValue();

            return decode(value, _decoder)[7];
        },
        getNewTwists: async () => {
            let value = await cubeTwistCharacteristic.readValue()
            let decodedValue = decode(value, _decoder);
            let dataView = new DataView(new Uint8Array(decodedValue).buffer);
            let count = dataView.getUint8(12);
            let result = [];

            if (_lastCount == -1)
                _lastCount = count;

            if (count != _lastCount) {
                let missed = (count - _lastCount) & 0xff;

                if (missed < 6) {
                    _lastCount = count;

                    for (let i = 19 - missed; i < 19; i++) {
                        result.push(turns[dataView.getUint8(i)]);
                    }
                }
            }

            /* // encoders
            var sides = "URFDLB";
            htm = "";
            for (var i = 0; i < 6; i++)
            {
                htm += sides[i] + ": " + value.getUint8(i + 6) + "<br />";
            }*/

            return result;
        }
    }
}

/**
 * Gan characteristic decode function
 * @param {*} value 
 */
function decode(value, decoder) {
    var ret = [];

    for (var i = 0; i < value.byteLength; i++) {
        ret[i] = value.getUint8(i);
    }

    if (decoder == null) {
        return ret;
    }

    if (ret.length > 16) {
        ret = ret.slice(0, ret.length - 16).concat(
            decoder.decrypt(ret.slice(ret.length - 16))
        );
    }

    decoder.decrypt(ret);

    return ret;
}

/**
 * Returns the key needed for decoding characteristics values
 * @param {*} version 
 * @param {*} hardwareValue 
 */
function getKey(version, hardwareValue) {
    var key = GAN_ENCRYPTION_KEYS[version >> 8 & 0xff];

    if (!key)
        throw 'Unsupported GAN cube with unknown encryption key';

    key = JSON.parse(LZString.decompressFromEncodedURIComponent(key));

    for (var i = 0; i < 6; i++) {
        key[i] = (key[i] + hardwareValue.getUint8(5 - i)) & 0xff;
    }

    return key;
}

export {
    filters,
    optionalServices,
    getServices,
}