const name = 'OLL';

const groups = [
    {
        id: 1,
        name: 'Well turned corners',
        algsIds: [1, 2, 3],
    },
    {
        id: 2,
        name: '"C" case',
        algsIds: [4, 5],
    },
    {
        id: 3,
        name: '"L" case',
        algsIds: [6, 7, 8, 9, 10, 11],
    },
    {
        id: 4,
        name: 'Major "Z" case',
        algsIds: [12, 13],
    },
    {
        id: 5,
        name: '"P" case',
        algsIds: [14, 15, 16, 17],
    },
    {
        id: 6,
        name: '"M" case',
        algsIds: [18, 19],
    },
    {
        id: 7,
        name: 'Well turned edges',
        algsIds: [20, 21, 22, 23, 24, 25, 26],
    },
    {
        id: 8,
        name: '"T" case',
        algsIds: [27, 28],
    },
    {
        id: 9,
        name: 'Minor "Z" case',
        algsIds: [29, 30, 31, 32],
    },
    {
        id: 10,
        name: '"Fish" case',
        algsIds: [33, 34, 35, 36],
    },
    {
        id: 11,
        name: '"Square" case',
        algsIds: [37, 38],
    },
    {
        id: 12,
        name: '"I" case',
        algsIds: [39, 40, 41, 42],
    },
    {
        id: 13,
        name: 'Major "L" case',
        algsIds: [43, 44, 45, 46],
    },
    {
        id: 14,
        name: '"4" case',
        algsIds: [47, 48, 49, 50],
    },
    {
        id: 15,
        name: 'Bad turned edges',
        algsIds: [51, 52, 53, 54, 55, 56, 57],
    },
];

const list = [
    {
        id: 1,
        algs: [
            {
                notation: "M' U M U2 M' U M",
                label: "(M' U M) U2 (M' U M)",
            }
        ]
    },
    {
        id: 2,
        algs: [
            {
                notation: "R U R' U' M' U R U' r'",
                label: "(R U R' U') (M' U R U') r'",
            }
        ]
    },
    {
        id: 3,
        algs: [
            {
                notation: "r' R U R U R' U' r2 R2 U R U' r'",
                label: "r' (R U) (R U R' U' r2) (R2' U) (R U') r'",
            }
        ]
    },
    {
        id: 4,
        algs: [
            {
                notation: "R U R2 U' R' F R U R U' F'",
                label: "(R U R2' U') (R' F) (R U) (R U') F'",
            }
        ]
    },
    {
        id: 5,
        algs: [
            {
                notation: "R' U' R' F R F' U R",
                label: "(R' U') (R' F R F') (U R)",
            }
        ]
    },
    {
        id: 6,
        algs: [
            {
                notation: "r U R' U R U' R' U R U2 r'",
                label: "(r U) (R' U) (R U') (R' U) (R U2' r')",
            }
        ]
    },
    {
        id: 7,
        algs: [
            {
                notation: "r U' R U' R' U R U' R' U2 r",
                label: "(r U') (R U') (R' U) (R U') (R' U2 r)",
            }
        ]
    },
    {
        id: 8,
        algs: [
            {
                notation: "R' F R' F' R2 U2 y R' F R F'",
                label: "(R' F R' F' R2) U2 y (R' F R F')",
            }
        ]
    },
    {
        id: 9,
        algs: [
            {
                notation: "R B' R B R2 U2 F R' F' R",
                label: "(R B' R B R2') U2 (F R' F' R)",
            }
        ]
    },
    {
        id: 10,
        algs: [
            {
                notation: "F R U R' U' R U R' U' F'",
                label: "F (R U R' U') (R U R' U') F'",
            }
        ]
    },
    {
        id: 11,
        algs: [
            {
                notation: "F' L' U' L U L' U' L U F",
                label: "F' (L' U' L U) (L' U' L U) F",
            }
        ]
    },
    {
        id: 12,
        algs: [
            {
                notation: "R' F R U R' U' F' U R",
                label: "(R' F) (R U R' U') F' U R",
            }
        ]
    },
    {
        id: 13,
        algs: [
            {
                notation: "L F' L' U' L U F U' L'",
                label: "(L F') (L' U' L U) F U' L'",
            }
        ]
    },
    {
        id: 14,
        algs: [
            {
                notation: "f R U R' U' f'",
                label: "f (R U R' U') f'",
            }
        ]
    },
    {
        id: 15,
        algs: [
            {
                notation: "f' L' U' L U f",
                label: "f' (L' U' L U) f",
            }
        ]
    },
    {
        id: 16,
        algs: [
            {
                notation: "S R U R' U' R' F R f'",
                label: "S (R U R' U') (R' F R f')",
            }
        ]
    },
    {
        id: 17,
        algs: [
            {
                notation: "S' L' U' L U L F' L' f",
                label: "S' (L' U' L U) (L F' L' f)",
            }
        ]
    },
    {
        id: 18,
        algs: [
            {
                notation: "R U R' U R U' R' U' R' F R F'",
                label: "(R U R' U) (R U' R' U') (R' F R F')",
            }
        ]
    },
    {
        id: 19,
        algs: [
            {
                notation: "L' U' L U' L' U L U L F' L' F",
                label: "(L' U' L U') (L' U L U) (L F' L' F)",
            }
        ]
    },
    {
        id: 20,
        algs: [
            {
                notation: "R2 D R' U2 R D' R' U2 R'",
                label: "(R2' D) (R' U2) (R D') (R' U2 R')",
            }
        ]
    },
    {
        id: 21,
        algs: [
            {
                notation: "R U2 R2 U' R2 U' R2 U2 R",
                label: "(R U2') (R2' U') (R2 U') (R2' U2' R)",
            }
        ]
    },
    {
        id: 22,
        algs: [
            {
                notation: "r U R' U' r' F R F'",
                label: "(r U) (R' U') (r' F R F')'",
            }
        ]
    },
    {
        id: 23,
        algs: [
            {
                notation: "R U2 R' U' R U R' U' R U' R'",
                label: "(R U2) (R' U' R U R' U' R U' R')",
            }
        ]
    },
    {
        id: 24,
        algs: [
            {
                notation: "R U2 R' U' R U' R'",
                label: "(R U2) (R' U' R U' R')",
            }
        ]
    },
    {
        id: 25,
        algs: [
            {
                notation: "R U R' U R U2 R'",
                label: "(R U R' U) (R U2 R')",
            }
        ]
    },
    {
        id: 26,
        algs: [
            {
                notation: "F' r U R' U' r' F R",
                label: "(F' r) (U R') (U' r') (F R)",
            }
        ]
    },
    {
        id: 27,
        algs: [
            {
                notation: "R U R' U' R' F R F'",
                label: "(R U R' U') (R' F R F')",
            }
        ]
    },
    {
        id: 28,
        algs: [
            {
                notation: "F R U R' U' F'",
                label: "F (R U R' U') F'",
            }
        ]
    },
    {
        id: 29,
        algs: [
            {
                notation: "r U R' U R U2 r'",
                label: "(r U R' U) (R U2 r')",
            }
        ]
    },
    {
        id: 30,
        algs: [
            {
                notation: "r' U' R U' R' U2 r",
                label: "(r' U' R U') (R' U2 r)",
            }
        ]
    },
    {
        id: 31,
        algs: [
            {
                notation: "M U2 R' U' R U' R' U2 R U M'",
                label: "(M U2) (R' U' R U') (R' U2 R) U M'",
            }
        ]
    },
    {
        id: 32,
        algs: [
            {
                notation: "r' R2 U R' U R U2 R' U M'",
                label: "r' (R2 U R' U R U2 R') U M'",
            }
        ]
    },
    {
        id: 33,
        algs: [
            {
                notation: "F R U' R' U' R U R' F'",
                label: "F (R U') (R' U' R U) (R' F')",
            }
        ]
    },
    {
        id: 34,
        algs: [
            {
                notation: "R U2 R2 F R F' R U2 R'",
                label: "(R U2) (R2 F) (R F' R U2 R')",
            }
        ]
    },
    {
        id: 35,
        algs: [
            {
                notation: "R U R' U R' F R F' R U2 R'",
                label: "(R U R' U) (R' F R F') (R U2 R')",
            }
        ]
    },
    {
        id: 36,
        algs: [
            {
                notation: "R U R' U' R' F R2 U R' U' F'",
                label: "(R U R' U' R' F) (R2 U R' U' F')",
            }
        ]
    },
    {
        id: 37,
        algs: [
            {
                notation: "r' U2 R U R' U r",
                label: "(r' U2) (R U R' U r)",
            }
        ]
    },
    {
        id: 38,
        algs: [
            {
                notation: "r U2 R' U' R U' r'",
                label: "(r U2) (R' U' R U' r')",
            }
        ]
    },
    {
        id: 39,
        algs: [
            {
                notation: "f R U R' U' R U R' U' f'",
                label: "f (R U R' U') (R U R' U') f'",
            }
        ]
    },
    {
        id: 40,
        algs: [
            {
                notation: "f R U R' U' f' F R U R' U' R U R' U' F'",
                label: "f (R U R' U') f' F( R U R' U') (R U R' U') F'",
            }
        ]
    },
    {
        id: 41,
        algs: [
            {
                notation: "R U R' U R d' R U' R' F'",
                label: "(R U R' U R d') (R U' R' F')",
            }
        ]
    },
    {
        id: 42,
        algs: [
            {
                notation: "R U2 R2 U' R U' R' U2 F R F'",
                label: "(R U2) (R2 U' R U' R' U2) (F R F')",
            }
        ]
    },
    {
        id: 43,
        algs: [
            {
                notation: "r U' r' U' r U r' y' R' U R",
                label: "(r U' r' U' r U r') y' (R' U R)",
            }
        ]
    },
    {
        id: 44,
        algs: [
            {
                notation: "R' F R U R' F' R y' R U' R'",
                label: "(R' F) (R U R' F' R) y' (R U' R')",
            }
        ]
    },
    {
        id: 45,
        algs: [
            {
                notation: "r U r' R U R' U' r U' r'",
                label: "(r U r') (R U R' U') (r U' r')",
            }
        ]
    },
    {
        id: 46,
        algs: [
            {
                notation: "l' U' l L' U' L U l' U l",
                label: "(l' U' l) (L' U' L U) (l' U l)",
            }
        ]
    },
    {
        id: 47,
        algs: [
            {
                notation: "R' F R F' R U2 R' U' y' R' U' R",
                label: "(R' F R F') (R U2 R' U') y' (R' U' R)",
            }
        ]
    },
    {
        id: 48,
        algs: [
            {
                notation: "R2 U R' B' R U' R2 U R B R'",
                label: "(R2' U) (R' B' R U') (R2' U) R B R'",
            }
        ]
    },
    {
        id: 49,
        algs: [
            {
                notation: "R U R' U R U' R' U R U' R' U' R' F R F'",
                label: "(R U R' U) (R U' R' U) (R U' R' U') (R' F R F')",
            }
        ]
    },
    {
        id: 50,
        algs: [
            {
                notation: "R' F R F' R' F R F' R U R' U' R U R'",
                label: "(R' F R F') (R' F R F') (R U R' U') R U R'",
            }
        ]
    },
    {
        id: 51,
        algs: [
            {
                notation: "F R U R' U' S R U R' U' f'",
                label: "F (R U R' U') S (R U R' U') f'",
            }
        ]
    },
    {
        id: 52,
        algs: [
            {
                notation: "f R U R' U' f' U F R U R' U' F'",
                label: "f (R U R' U') f' U F (R U R' U') F'",
            }
        ]
    },
    {
        id: 53,
        algs: [
            {
                notation: "R U2 R2 F R F' U2 R' F R F",
                label: "(R U2) (R2' F R F') U2 (R' F R F)",
            }
        ]
    },
    {
        id: 54,
        algs: [
            {
                notation: "f R U R' U' f' U' F R U R' U' F'",
                label: "f (R U R' U') f' U' F (R U R' U') F'",
            }
        ]
    },
    {
        id: 55,
        algs: [
            {
                notation: "r' R U R U R' U' r x R2 U R U'",
                label: "r' (R U) (R U R' U' r) x (R2' U) (R U')",
            }
        ]
    },
    {
        id: 56,
        algs: [
            {
                notation: "F R U R' U y' R' U2 R' F R F",
                label: "F (R U R' U) y' (R' U2) (R' F R F)",
            }
        ]
    },
    {
        id: 57,
        algs: [
            {
                notation: "R U R' U R' F R F' U2 R' F R F'",
                label: "(R U R' U) (R' F R F') U2 (R' F R F')",
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
    name,
    algsByGroup as GROUPS,
    list as LIST,
    getVisual
}