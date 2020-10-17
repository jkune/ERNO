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
    U: 'ffffff',
    B: '0085f7',
    L: 'ffa300',
    R: 'ff1400',
    D: 'fdff00',
    F: '00c700',
    P: '08101a',
}

export {
    name,
    logo,
    sizes,
    colors,
}