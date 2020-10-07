const groups = [
    {
        id: 1,
        name: '1 oriented corner',
        algsIds: [1, 2],
    },
    {
        id: 2,
        name: '2 oriented corners',
        algsIds: [3, 4, 5],
    },
    {
        id: 3,
        name: 'No oriented corners',
        algsIds: [6, 7],
    }
];

const list = [
    {
        id: 1,
        algs: [
            {
                notation: "R U R' U R U2 R'",
                label: "(R U R' U) (R U2 R')",
            }
        ]
    },
    {
        id: 2,
        algs: [
            {
                notation: "R U2 R' U' R U' R'",
                label: "(R U2 R' U') (R U' R')",
            }
        ]
    },
    {
        id: 3,
        algs: [
            {
                notation: "F R U R' U' F'",
                label: "F (R U R' U') F'",
            }
        ]
    },
    {
        id: 4,
        algs: [
            {
                notation: "R U R' U' R' F R F'",
                label: "(R U R' U') (R' F R F')",
            }
        ]
    },
    {
        id: 5,
        algs: [
            {
                notation: "F R U' R' U' R U R' F'",
                label: "(F R U') (R' U' R U) (R' F')",
            }
        ]
    },
    {
        id: 6,
        algs: [
            {
                notation: "F R U R' U' R U R' U' F'",
                label: "F (R U R' U') (R U R' U') F'",
            }
        ]
    },
    {
        id: 7,
        algs: [
            {
                notation: "R2 U2 R U2 R2",
                label: "(R2 U2 R) (U2 R2)",
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
        stage: 'oll',
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