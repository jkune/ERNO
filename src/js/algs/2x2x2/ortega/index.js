import * as OrtegaOLL from './ortega-oll/index.js';
import * as OrtegaPLL from './ortega-pll/index.js';
import { Ortega, Ortega_name } from '../../../util/methods/index.js';

const steps = [OrtegaOLL, OrtegaPLL];
const name = Ortega_name;
const key = Ortega;

export {
    steps,
    name,
    key,
};