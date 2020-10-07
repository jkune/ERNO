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
        arrows: ['U0U2-blue,U2U0-blue'],
        algs: [
            {
                notation: "2R 2F R U R' 2F R F' R U",
                label: "(2R' 2F R) U (R' 2F R) (F' R) U",
            }
        ]
    },
    {
        id: 2,
        arrows: ['U0U3-blue,U3U0-blue'],
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

const getVisual = (alg, scheme) => {
    const URL = 'http://cube.rider.biz/visualcube.php';
    const query = {
        fmt: 'svg',
        pzl: 2,
        size: 300,
        view: 'plan',
        stage: 'pll',
        bg: 't',
        case: alg.notation.split(' ').join(''),
        sch: Object.values(scheme).join()
    };

    return URL + '?' + Object.keys(query).map((key) => {
        return key + '=' + query[key];
    }).join('&');
}   

export {
    algsByGroup as GROUPS,
    list as LIST,
    getVisual
}