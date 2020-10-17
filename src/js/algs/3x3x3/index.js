import * as CFOP from './cfop/index.js';

const methods = [CFOP];
const name = '3x3x3';
const key = '3x3x3';
const size = 3;
const getVisual = (scheme = {}) => {
    const URL = 'http://cube.rider.biz/visualcube.php';
    const query = {
        fmt: 'svg',
        pzl: size,
        size: 300,
        bg: 't',
        cc: 'black',
        sch: Object.keys(scheme).sort((a, b) => {
            const order = ['U', 'R', 'F', 'D', 'L', 'B'];

            return order.indexOf(a) - order.indexOf(b);
        }).map(e => scheme[e]).join()
    };

    return URL + '?' + Object.keys(query).map((key) => {
        return key + '=' + query[key];
    }).join('&');
}

export {
    methods,
    name,
    key,
    size, 
    getVisual
};