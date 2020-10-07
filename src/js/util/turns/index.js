const TYPE = 'TURN';

const U = 'U';
const L = 'L';
const F = 'F';
const R = 'R';
const B = 'B';
const D= 'D';
const M = 'M';
const E = 'E';
const S = 'S';

const u = 'u';
const l = 'l';
const f = 'f';
const r = 'r';
const b = 'b';
const d = 'd';

const INVERSE_U = 'U\'';
const INVERSE_L = 'L\'';
const INVERSE_F = 'F\'';
const INVERSE_R = 'R\'';
const INVERSE_B = 'B\'';
const INVERSE_D = 'D\'';
const INVERSE_M = 'M\'';
const INVERSE_E = 'E\'';
const INVERSE_S = 'S\'';

const INVERSE_u = 'u\'';
const INVERSE_l = 'l\'';
const INVERSE_f = 'f\'';
const INVERSE_r = 'r\'';
const INVERSE_b = 'b\'';
const INVERSE_d = 'd\'';

const DOUBLE_U = 'U2';
const DOUBLE_L = 'L2';
const DOUBLE_F = 'F2';
const DOUBLE_R = 'R2';
const DOUBLE_B = 'B2';
const DOUBLE_D = 'D2';
const DOUBLE_M = 'M2';
const DOUBLE_E = 'E2';
const DOUBLE_S = 'S2';

const DOUBLE_u = 'u2';
const DOUBLE_l = 'l2';
const DOUBLE_f = 'f2';
const DOUBLE_r = 'r2';
const DOUBLE_b = 'b2';
const DOUBLE_d = 'd2';

const LIST = [
    U,
    L,
    F,
    R,
    B,
    D,
    M,
    E,
    S,
    u,
    l,
    f,
    r,
    b,
    d,
    INVERSE_U,
    INVERSE_L,
    INVERSE_F,
    INVERSE_R,
    INVERSE_B,
    INVERSE_D,
    INVERSE_M,
    INVERSE_E,
    INVERSE_S,
    INVERSE_u,
    INVERSE_l,
    INVERSE_f,
    INVERSE_r,
    INVERSE_b,
    INVERSE_d,
    DOUBLE_U,
    DOUBLE_L,
    DOUBLE_F,
    DOUBLE_R,
    DOUBLE_B,
    DOUBLE_D,
    DOUBLE_M,
    DOUBLE_E,
    DOUBLE_S,
    DOUBLE_u,
    DOUBLE_l,
    DOUBLE_f,
    DOUBLE_r,
    DOUBLE_b,
    DOUBLE_d,
];

const CW_LIST = [
    U,
    L,
    F,
    R,
    B,
    D,
    M,
    E,
    S,
    u,
    l,
    f,
    r,
    b,
    d,
];

const CCW_LIST = [
    INVERSE_U,
    INVERSE_L,
    INVERSE_F,
    INVERSE_R,
    INVERSE_B,
    INVERSE_D,
    INVERSE_M,
    INVERSE_E,
    INVERSE_S,
    INVERSE_u,
    INVERSE_l,
    INVERSE_f,
    INVERSE_r,
    INVERSE_b,
    INVERSE_d,
];

const FLIP_LIST = [
    DOUBLE_U,
    DOUBLE_L,
    DOUBLE_F,
    DOUBLE_R,
    DOUBLE_B,
    DOUBLE_D,
    DOUBLE_M,
    DOUBLE_E,
    DOUBLE_S,
    DOUBLE_u,
    DOUBLE_l,
    DOUBLE_f,
    DOUBLE_r,
    DOUBLE_b,
    DOUBLE_d,
];

export {
    TYPE,

    LIST,
    
    CW_LIST,
    CCW_LIST,
    FLIP_LIST,

    U,
    L,
    F,
    R,
    B,
    D,
    M,
    E,
    S,

    u,
    l,
    f,
    r,
    b,
    d,

    INVERSE_U,
    INVERSE_L,
    INVERSE_F,
    INVERSE_R,
    INVERSE_B,
    INVERSE_D,
    INVERSE_M,
    INVERSE_E,
    INVERSE_S,

    INVERSE_u,
    INVERSE_l,
    INVERSE_f,
    INVERSE_r,
    INVERSE_b,
    INVERSE_d,

    DOUBLE_U,
    DOUBLE_L,
    DOUBLE_F,
    DOUBLE_R,
    DOUBLE_B,
    DOUBLE_D,
    DOUBLE_M,
    DOUBLE_E,
    DOUBLE_S,

    DOUBLE_u,
    DOUBLE_l,
    DOUBLE_f,
    DOUBLE_r,
    DOUBLE_b,
    DOUBLE_d,
}