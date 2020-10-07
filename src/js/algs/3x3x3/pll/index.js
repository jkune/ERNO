const name = 'PLL';

const groups = [
    {
        id: 1,
        name: 'Only corners',
        algsIds: [1, 2, 3],
    },
    {
        id: 2,
        name: 'Only edges',
        algsIds: [4, 5, 6, 7],
    },
    {
        id: 3,
        name: '2 corners and 2 edges',
        algsIds: [8, 9, 10, 11, 12, 13],
    },
    {
        id: 4,
        name: '3 corners and 3 edges',
        algsIds: [14, 15, 16, 17],
    },
    {
        id: 5,
        name: 'Diagonal corners',
        algsIds: [18, 19, 20, 21],
    }
];

const list = [
    {
        id: 1,
        arrows: 'U0U2-s8-blue,U2U8-s8-blue,U8U0-s8-blue',
        algs: [
            {
                notation: "x R' U R' D2 R U' R' D2 R2",
                label: "x (R' U R') D2 (R U' R') D2 R2",
            }
        ]
    },
    {
        id: 2,
        arrows: 'U2U0-s8-blue,U8U2-s8-blue,U0U8-s8-blue',
        algs: [
            {
                notation: "x R2 D2 R U R' D2 R U' R",
                label: "x R2 D2 (R U R') D2 (R U' R)",
            }
        ]
    },
    {
        id: 3,
        arrows: 'U0U6-s8-blue,U6U0-s8-blue,U8U2-s8-blue,U2U8-s8-blue',
        algs: [
            {
                notation: "x' R U' R' D R U R' D' R U R' D R U' R' D'",
                label: "x' (R U' R' D) (R U R' D') (R U R' D) (R U' R' D')",
            }
        ]
    },
    {
        id: 4,
        arrows: 'U3U7-s7-red,U7U5-s7-red,U5U3-s7-red',
        algs: [
            {
                notation: "R U' R U R U R U' R' U' R2",
                label: "(R U' R U) (R U) (R U') (R' U' R2)",
            }
        ]
    },
    {
        id: 5,
        arrows: 'U1U7-red,U7U1-red,U5U3-red,U3U5-red',
        algs: [
            {
                notation: "M2 U M2 U2 M2 U M2",
                label: "(M2' U) (M2' U2) (M2' U) M2'",
            }
        ]
    },
    {
        id: 6,
        arrows: 'U7U3-s7-red,U5U7-s7-red,U3U5-s7-red',
        algs: [
            {
                notation: "R2 U R U R' U' R' U' R' U R'",
                label: "(R2 U) (R U R' U') (R' U') (R' U R')",
            }
        ]
    },
    {
        id: 7,
        arrows: 'U1U3-red,U3U1-red,U5U7-red,U7U5-red',
        algs: [
            {
                notation: "M2 U M2 U M' U2 M2 U2 M' U2",
                label: "(M2' U) (M2' U) (M' U2) (M2' U2) (M' U2)",
            }
        ]
    },
    {
        id: 8,
        arrows: 'U0U2-blue,U2U0-blue,U1U3-red,U3U1-red',
        algs: [
            {
                notation: "R' U L' U2 R U' R' U2 L R U'",
                label: "(R' U L)' U2 (R U' R') U2 (L R U')",
            }
        ]
    },
    {
        id: 9,
        arrows: 'U0U2-blue,U2U0-blue,U5U7-red,U7U5-red',
        algs: [
            {
                notation: "R' U2 R U2 R' F R U R' U' R' F' R2 U'",
                label: "(R' U2) (R U2) (R' F R U R' U') (R' F' R2 U')",
            }
        ]
    },
    {
        id: 10,
        arrows: 'U8U2-blue,U2U8-blue,U5U7-red,U7U5-red',
        algs: [
            {
                notation: "R U R' F' R U R' U' R' F R2 U' R' U'",
                label: "(R U R' F') (R U R' U') (R' F) (R2 U') (R' U')",
            }
        ]
    },
    {
        id: 11,
        arrows: 'U8U2-blue,U2U8-blue,U1U3-red,U3U1-red',
        algs: [
            {
                notation: "R U R' F' R U2 R' U2 R' F R U R U2 R' U'",
                label: "(R U R' F') (R U2) (R' U2) (R' F R U) (R U2) (R' U')",
            }
        ]
    },
    {
        id: 12,
        arrows: 'U8U2-blue,U2U8-blue,U5U3-red,U3U5-red',
        algs: [
            {
                notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
                label: "(R U R' U') (R' F) (R2 U') (R' U' R U) (R' F')",
            }
        ]
    },
    {
        id: 13,
        arrows: 'U8U2-blue,U2U8-blue,U1U7-red,U7U1-red',
        algs: [
            {
                notation: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
                label: "R' U' F' (R U R' U') (R' F) (R2 U') (R' U' R U) (R' U R)",
            }
        ]
    },
    {
        id: 14,
        arrows: 'U0U2-s9-blue,U2U6-s8-blue,U6U0-s8-blue,U1U3-s8-red,U3U5-s7-red,U5U1-s8-red',
        algs: [
            {
                notation: "R2 u R' U R' U' R u' R2 y' R' U R",
                label: "(R2' u) (R' U R' U' R u') R2' y' (R' U R)",
            }
        ]
    },
    {
        id: 15,
        arrows: 'U8U0-s8-blue,U6U8-s8-blue,U0U6-s9-blue,U7U3-s8-red,U3U5-s7-red,U5U7-s8-red',
        algs: [
            {
                notation: "R2 u' R U' R U R' u R2 f R' f'",
                label: "(R2' u' R U') (R U R' u R2) (f R' f')",
            }
        ]
    },
    {
        id: 16,
        arrows: 'U8U0-s8-blue,U6U8-s8-blue,U0U6-s9-blue,U7U3-s8-red,U3U1-s7-red,U1U7-s7-red',
        algs: [
            {
                notation: "R' U' R y R2 u R' U R U' R u' R2",
                label: "(R' U' R) y (R2' u R' U) (R U' R u' R2')",
            }
        ]
    },
    {
        id: 17,
        arrows: 'U0U2-s8-blue,U2U6-s8-blue,U6U0-s9-blue,U3U7-s8-red,U1U3-s7-red,U7U1-s7-red',
        algs: [
            {
                notation: "R U R' y' R2 u' R U' R' U R' u R2",
                label: "(R U R') y' (R2' u' R U') (R' U R' u R2)",
            }
        ]
    },
    {
        id: 18,
        arrows: 'U0U8-blue,U8U0-blue,U1U5-red,U5U1-red',
        algs: [
            {
                notation: "R' U R' d' R' F' R2 U' R' U R' F R F",
                label: "(R' U R' d') (R' F' R2 U') (R' U R' F) (R F)",
            }
        ]
    },
    {
        id: 19,
        arrows: 'U2U6-blue,U6U2-blue,U1U7-red,U7U1-red',
        algs: [
            {
                notation: "z U' R D' R2 U R' D U' R D' R2 U R' D R'",
                label: "(z) U' (R D') (R2' U R' D U') (R D') (R2' U R' D R')",
            }
        ]
    },
    {
        id: 20,
        arrows: 'U0U8-blue,U8U0-blue,U1U7-red,U7U1-red',
        algs: [
            {
                notation: "z D R' U R2 D' R D U' R' U R2 D' R U' R",
                label: "(z) D (R' U) (R2 D' R D U') (R' U) (R2 D' R U' R)",
            }
        ]
    },
    {
        id: 21,
        arrows: 'U0U8-blue,U8U0-blue,U1U3-red,U3U1-red',
        algs: [
            {
                notation: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
                label: "(F R U') (R' U' R U) (R' F') (R U R' U') (R' F R F')",
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
        pzl: 3,
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
    name,
    algsByGroup as GROUPS,
    list as LIST,
    getVisual
}