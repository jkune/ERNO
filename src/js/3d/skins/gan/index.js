import * as one from './1x1x1/index.js';
import * as two from './2x2x2/index.js';
import * as three from './3x3x3/index.js';
import * as four from './4x4x4/index.js';

const name = 'GANcube';
const logo = 'gancube_logo.png';
const sizes = {
    1: one,
    2: two,
    3: three,
    4: four,
}
const colors = {
    U: 0xffffff,
    B: 0x0085f7,
    L: 0xffa300,
    R: 0xff1400,
    D: 0xfdff00,
    F: 0x00c700
}

export {
    name,
    logo,
    sizes,
    colors,
}