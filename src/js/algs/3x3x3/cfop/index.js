import * as F2L from './f2l/index.js';
import * as OLL from './oll/index.js';
import * as PLL from './pll/index.js';
import { CFOP, CFOP_name } from '../../../util/methods/index.js';

const steps = [F2L, OLL, PLL];
const name = CFOP_name;
const key = CFOP;

export {
    steps,
    name,
    key,
};