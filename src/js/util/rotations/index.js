const TYPE = 'ROTATION';

const X = 'x';
const Y = 'y';
const Z = 'z';

const INVERSE_X = 'x\'';
const INVERSE_Y = 'y\'';
const INVERSE_Z = 'z\'';

const DOUBLE_X = 'x2';
const DOUBLE_Y = 'y2';
const DOUBLE_Z = 'z2';

const LIST = [
    X,
    Y,
    Z,
    INVERSE_X,
    INVERSE_Y,
    INVERSE_Z,
    DOUBLE_X,
    DOUBLE_Y,
    DOUBLE_Z,
];

const CW_LIST = [
    X,
    Y,
    Z,
];

const CCW_LIST = [
    INVERSE_X,
    INVERSE_Y,
    INVERSE_Z,
];

const FLIP_LIST = [
    DOUBLE_X,
    DOUBLE_Y,
    DOUBLE_Z,
];

export {
    TYPE, 

    LIST,

    CW_LIST,
    CCW_LIST,
    FLIP_LIST,

    X,
    Y,
    Z,

    INVERSE_X,
    INVERSE_Y,
    INVERSE_Z,

    DOUBLE_X,
    DOUBLE_Y,
    DOUBLE_Z,
}