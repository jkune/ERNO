import { Ortega_PLL, Ortega_PLL_name } from '../../../../util/methods/index.js';

const groups = [
    {
        id: 1,
        name: 'Base done',
        algsIds: [1, 2],
    },
    {
        id: 2,
        name: 'Base and up layer',
        algsIds: [3, 4, 5],
    }
];

const list = [
    {
        id: 1,
        arrows: ['U0U2-blue,U2U0-blue', ''],
        algs: [
            {
                notation: "R2 F2 R U R' F2 R F' R U",
                label: "(R2' F2 R) U (R' F2 R) (F' R) U",
            }
        ]
    },
    {
        id: 2,
        arrows: ['U0U3-blue,U3U0-blue', ''],
        algs: [
            {
                notation: "R U' R' U' F2 U' R U R' D R2",
                label: "(R U' R' U') F2 (U' R U R') (D R2)",
            }
        ]
    },
    {
        id: 3,
        arrows: ['U0U1-blue,U1U0-blue', 'U0U1-blue,U1U0-blue'],
        algs: [
            {
                notation: "R2 U' B2 U2 R2 U' R2",
                label: "(R2 U' B2) (U2' R2' U' R2)",
            }
        ]
    },
    {
        id: 4,
        arrows: ['U0U1-blue,U1U0-blue', 'U1U2-blue,U2U1-blue'],
        algs: [
            {
                notation: "R U' R F2 R' U R'",
                label: "(R U' R) F2 (R' U R')",
            }
        ]
    },
    {
        id: 5,
        arrows: ['U0U3-blue,U3U0-blue', 'U0U3-blue,U3U0-blue'],
        algs: [
            {
                notation: "R2 F2 R2",
                label: "R2' F2 R2",
            }
        ]
    },
];

const algsByGroup = groups.map((group) => {
    const algs = group.algsIds.map((id) => {
        return list.find(e => e.id === id);
    });

    return {
        id: group.id,
        name: group.name,
        algs,
    }
})


const getVisuals = (item, scheme = {}) => {
    const URL = 'http://cube.rider.biz/visualcube.php';
    const query = {
        fmt: 'svg',
        pzl: 2,
        size: 300,
        view: 'plan',
        stage: 'pll',
        bg: 't',
        cc: 'black',
        case: item.algs[0].notation.split(' ').join(''),
        sch: Object.keys(scheme).sort((a, b) => {
            const order = ['U', 'R', 'F', 'D', 'L', 'B'];

            return order.indexOf(a) - order.indexOf(b);
        }).map(e => scheme[e]).join()
    };

    return item.arrows.map((arrows, index) => {
        const stage = index === 1 ? 'oll' : 'pll';
        const query2 = Object.assign({}, query, {arw: arrows, stage: stage});
        const prefix = index === 1 ? 'z2' : '';

        return URL + '?' + Object.keys(query2).map((key) => {
            const value = key === 'case' ? prefix + query2[key] : query2[key];

            return key + '=' + value;
        }).join('&');
    });
}  

const name = Ortega_PLL_name;
const key = Ortega_PLL;

export {
    name,
    key,
    algsByGroup as groups,
    list,
    getVisuals
}