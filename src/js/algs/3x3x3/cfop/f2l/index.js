import { F2L, F2L_name } from '../../../../util/methods/index.js';

const name = F2L_name;
const key = F2L;

const list = [
    {
        id: 0,
        algs: [{
            notation: "R' F R F'",
            label: "R' F R F'"
        },
        {
            notation: "U2 R U2 R'",
            label: "U2 R U2 R'"
        },
        {
            notation: "M' U R U' r'",
            label: "M' U R U' r'"
        },
        {
            notation: "y2 U L U' L' y2",
            label: "y2 U L U' L'"
        },
        {
            notation: "y' r' U' R U M' y",
            label: "y' r' U' R U M'"
        }
        ]
    },
    {
        id: 1,
        algs: [{
            notation: "y U' L' U L y'",
            label: "y U' L' U L"
        }, {
            notation: "F R' F' R",
            label: "F R' F' R"
        }, {
            notation: "y' U' R' U R y",
            label: "y' U' R' U R"
        }, {
            notation: "r U R' U' M",
            label: "r U R' U' M"
        }, {
            notation: "d' L' U L",
            label: "d' L' U L"
        }]
    }, {
        id: 2,
        algs: [{
            notation: "y L' U' L y'",
            label: "y L' U' L"
        }, {
            notation: "F' U' F",
            label: "F' U' F"
        }, {
            notation: "y' R' U' R y",
            label: "y' R' U' R"
        }, {
            notation: "U M R U' R' U M'",
            label: "U M R U' R' U M'"
        }, {
            notation: "U R U2 R' U' F' U F",
            label: "U R U2 R' U' F' U F"
        }]
    }, {
        id: 3,
        algs: [{
            notation: "R U R'",
            label: "R U R'"
        }, {
            notation: "y2 L U L' y2",
            label: "y2 L U L'"
        }, {
            notation: "y F U F' y'",
            label: "y F U F'"
        }]
    }, {
        id: 4,
        algs: [{
            notation: "U' R U R' U2 R U' R'",
            label: "U' R U R' U2 R U' R'"
        }, {
            notation: "U' R U R' U' R U2 R'",
            label: "U' R U R' U' R U2 R'"
        }, {
            notation: "U' R U R' U R' F R F'",
            label: "U' R U R' U R' F R F'"
        }, {
            notation: "F2 L' U' L U F2",
            label: "F2 L' U' L U F2"
        }, {
            notation: "y' U r' U R U' R' U' r y",
            label: "y' U r' U R U' R' U' r"
        }]
    }, {
        id: 5,
        algs: [{
            notation: "d R' U' R U2 R' U R y",
            label: "d R' U' R U2 R' U R"
        }, {
            notation: "y U L' U' L U2 L' U L y'",
            label: "y U L' U' L U2 L' U L"
        }, {
            notation: " U' r U' R' U R U r'",
            label: " U' r U' R' U R U r' "
        }, {
            notation: "U F' U' F U2 F' U F",
            label: "U F' U' F U2 F' U F"
        }, {
            notation: "d R' U' R U R' U2 R",
            label: "d R' U' R U R' U2 R"
        }]
    }, {
        id: 6,
        algs: [{
            notation: "U' R U2 R' U2 R U' R'",
            label: "U' R U2 R' U2 R U' R' "
        }, {
            notation: "U' R U2 R' U' R U2 R'",
            label: "U' R U2 R' U' R U2 R'"
        }, {
            notation: "U' R U2 R' U R' F R F'",
            label: "U' R U2 R' U R' F R F'"
        }, {
            notation: "M' U' M U2 r U' r'",
            label: "M' U' M U2 r U' r'"
        }, {
            notation: "y' r U2 R2 U' R2 U' r' y",
            label: "y' r U2 R2 U' R2 U' r'"
        }]
    }, {
        id: 7,
        algs: [{
            notation: "d R' U2 R U2 R' U R y",
            label: "d R' U2 R U2 R' U R"
        }, {
            notation: "r' U2 R2 U R2’ U r",
            label: "r' U2 R2 U R2’ U r "
        }, {
            notation: "y U L' U2 L U2 L' U L y'",
            label: "y U L' U2 L U2 L' U L"
        }, {
            notation: "U F' U2 F U2 F' U F",
            label: "U F' U2 F U2 F' U F"
        }, {
            notation: "d R' U2 R U R' U2 R",
            label: "d R' U2 R U R' U2 R"
        }]
    }, {
        id: 8,
        algs: [{
            notation: "U' R U' R' U F' U' F",
            label: "U' R U' R' U F' U' F "
        }, {
            notation: "U' R U' R' d R' U' R",
            label: "U' R U' R' d R' U' R"
        }, {
            notation: "F R U R' U' F' R U' R'",
            label: "F R U R' U' F' R U' R'"
        }, {
            notation: "y' U R' U' R U' R' U' R y",
            label: "y' U R' U' R U' R' U' R"
        }, {
            notation: "d R' U' R U' R' U' R",
            label: "d R' U' R U' R' U' R"
        }]
    }, {
        id: 9,
        algs: [{
            notation: "U' R U R' U R U R'",
            label: "U' R U R' U R U R' "
        }, {
            notation: "U y' R' U R U' y R U R'",
            label: "U y' R' U R U' y R U R'"
        }, {
            notation: "U2 R U' R' U' R U R'",
            label: "U2 R U' R' U' R U R'"
        }, {
            notation: "d R' U R d' R U R'",
            label: "d R' U R d' R U R'"
        }, {
            notation: "R' U R2 U R'",
            label: "R' U R2 U R'"
        }]
    }, {
        id: 10,
        algs: [{
            notation: "U' R U2 R' U F' U' F",
            label: "U' R U2 R' U F' U' F"
        }, {
            notation: "U' R U2 R' d R' U' R",
            label: "U' R U2 R' d R' U' R"
        }, {
            notation: "y' R U2 R2 U' R2 U' R' y",
            label: "y' R U2 R2 U' R2 U' R'"
        }, {
            notation: "F R' F' R U' R U' R' U R U' R'",
            label: "F R' F' R U' R U' R' U R U' R'"
        }, {
            notation: "y L' U L U' L' U L U2 L' U L y'",
            label: "y L' U L U' L' U L U2 L' U L"
        }]
    }, {
        id: 11,
        algs: [{
            notation: "R U' R' U R U' R' U2 R U' R'",
            label: "R U' R' U R U' R' U2 R U' R'"
        }, {
            notation: "R' U2 R2 U R2 U R",
            label: "R' U2 R2 U R2 U R "
        }, {
            notation: "U F' U2 F U' R U R'",
            label: "U F' U2 F U' R U R'"
        }, {
            notation: "U R U' R' U' R U R' U' R U R'",
            label: "U R U' R' U' R U R' U' R U R'"
        }, {
            notation: "d R' U2 R d' R U R'",
            label: "d R' U2 R d' R U R'"
        }]
    }, {
        id: 12,
        algs: [{
            notation: "y' U R' U R U' R' U' R y",
            label: "y' U R' U R U' R' U' R"
        }, {
            notation: "d R' U R U' R' U' R",
            label: "d R' U R U' R' U' R"
        }, {
            notation: "y U L' U L U' L' U' L y'",
            label: "y U L' U L U' L' U' L"
        }, {
            notation: "M' U' R U R' U' R U2 r'",
            label: "M' U' R U R' U' R U2 r'"
        }, {
            notation: "U R U' R' U R U' R' U' F' U F",
            label: "U R U' R' U R U' R' U' F' U F"
        }]
    }, {
        id: 13,
        algs: [{
            notation: "U' R U' R' U R U R'",
            label: "U' R U' R' U R U R'"
        }, {
            notation: "y L' U2 L U2 F U2 F' U F U' F' y'",
            label: "y L' U2 L U2 F U2 F' U F U' F'"
        }, {
            notation: "R U' R' U R U2 R' U2 R U' R'",
            label: "R U' R' U R U2 R' U2 R U' R'"
        }]
    }, {
        id: 14,
        algs: [{
            notation: "R U R' U2 R U' R' U R U' R'",
            label: "R U R' U2 R U' R' U R U' R'"
        }, {
            notation: "y L' U L U2 y' R U R' y'",
            label: "y L' U L U2 y' R U R'"
        }, {
            notation: "M U r U' r' U' M'",
            label: "M U r U' r' U' M'"
        }, {
            notation: "R' D' R U' R' D R U R U' R'",
            label: "R' D' R U' R' D R U R U' R'"
        }, {
            notation: "R U2 R' U R U R' U R U' R'",
            label: "R U2 R' U R U R' U R U' R'"
        }]
    }, {
        id: 15,
        algs: [{
            notation: "R U' R' U2 F' U' F",
            label: "R U' R' U2 F' U' F"
        }, {
            notation: "R U' R' U2 y L' U' L",
            label: "R U' R' U2 y L' U' L"
        }, {
            notation: "R U' R' U d R' U' R",
            label: "R U' R' U d R' U' R"
        }, {
            notation: "U F U R U' R' F' R U R'",
            label: "U F U R U' R' F' R U R'"
        }, {
            notation: "R2 B' R' B R' U2 R U' R'",
            label: "R2 B' R' B R' U2 R U' R'"
        }]
    }, {
        id: 16,
        algs: [{
            notation: "R U2 R' U' R U R'",
            label: "R U2 R' U' R U R'"
        }, {
            notation: "y L F' L' F L' U L U' L' U L y'",
            label: "y L F' L' F L' U L U' L' U L"
        }, {
            notation: "U' R U' R' U2 R U2 R2 F R F'",
            label: "U' R U' R' U2 R U2 R2 F R F'"
        }]
    }, {
        id: 17,
        algs: [{
            notation: "y' R' U2 R U R' U' R y",
            label: "y' R' U2 R U R' U' R"
        }, {
            notation: "y L' U2 L U L' U' L y'",
            label: "y L' U2 L U L' U' L"
        }, {
            notation: "R' F R F' R U' R' U R U' R'",
            label: "R' F R F' R U' R' U R U' R'"
        }, {
            notation: "R U R' U' R U R' U' F R' F' R",
            label: "R U R' U' R U R' U' F R' F' R"
        }, {
            notation: "U R U' R2 F R F' U R U' R'",
            label: "U R U' R2 F R F' U R U' R'"
        }]
    }, {
        id: 18,
        algs: [{
            notation: "U R U2 R' U R U' R'",
            label: "U R U2 R' U R U' R'"
        }, {
            notation: "U R U2 R2 F R F'",
            label: "U R U2 R2 F R F'"
        }, {
            notation: "R U' R' U R U' R' U R U R'",
            label: "R U' R' U R U' R' U R U R'"
        }, {
            notation: "U R U2 R' U R U' R'\t",
            label: "U R U2 R' U R U' R'\t"
        }, {
            notation: "y U F U2 F2 L F L' y'",
            label: "y U F U2 F2 L F L'"
        }]
    }, {
        id: 19,
        algs: [{
            notation: "y' U' R' U2 R U' R' U R y",
            label: "y' U' R' U2 R U' R' U R"
        }, {
            notation: "y U' L' U2 L U' L' U L",
            label: "y U' L' U2 L U' L' U L"
        }, {
            notation: "U' R U' R2 F R F' R U' R'",
            label: "U' R U' R2 F R F' R U' R'"
        }, {
            notation: "d' L' U2 L U' L' U L",
            label: "d' L' U2 L U' L' U L"
        }, {
            notation: "U' R U R' U r U' r' U2 r U r'",
            label: "U' R U R' U r U' r' U2 r U r'"
        }]
    }, {
        id: 20,
        algs: [{
            notation: "U2 R U R' U R U' R'",
            label: "U2 R U R' U R U' R'"
        }, {
            notation: "R U' R' U2 R U R'",
            label: "R U' R' U2 R U R'"
        }, {
            notation: "y F R U2 R' F' y'",
            label: "y F R U2 R' F'"
        }, {
            notation: "R B U2 B' R'",
            label: "R B U2 B' R'"
        }, {
            notation: "U2 R U R2 F R F'",
            label: "U2 R U R2 F R F'"
        }]
    }, {
        id: 21,
        algs: [{
            notation: "F' L' U2 L F",
            label: "F' L' U2 L F"
        }, {
            notation: "y' U2 R' U' R U' R' U R y",
            label: "y' U2 R' U' R U' R' U R"
        }, {
            notation: "r U' r' U2 r U r'",
            label: "r U' r' U2 r U r'"
        }, {
            notation: "y' R' U R U2 R' U' R y",
            label: "y' R' U R U2 R' U' R"
        }, {
            notation: "y U2 L' U' L U' L' U L y'",
            label: "y U2 L' U' L U' L' U L"
        }]
    }, {
        id: 22,
        algs: [{
            notation: "R U R' U2 R U R' U' R U R'",
            label: "R U R' U2 R U R' U' R U R'"
        }, {
            notation: "U R U' R' U' R U' R' U R U' R'",
            label: "U R U' R' U' R U' R' U R U' R'"
        }, {
            notation: "U2 R2 U2 R' U' R U' R2",
            label: "U2 R2 U2 R' U' R U' R2"
        }, {
            notation: "y F' U' L' U L F L' U L y'",
            label: "y F' U' L' U L F L' U L"
        }, {
            notation: "F R' F' R U R U R'",
            label: "F R' F' R U R U R'"
        }]
    }, {
        id: 23,
        algs: [{
            notation: "F U R U' R' F' R U' R'",
            label: "F U R U' R' F' R U' R'"
        }, {
            notation: "U' R U R2 F R F' R U' R'",
            label: "U' R U R2 F R F' R U' R'"
        }, {
            notation: "y U' L' U L U L' U L U' L' U L y'",
            label: "y U' L' U L U L' U L U' L' U L"
        }, {
            notation: "y' R' U' R U2 R' U' R U R' U' R y",
            label: "y' R' U' R U2 R' U' R U R' U' R"
        }, {
            notation: "R U R' U R U R' U2 F' U F",
            label: "R U R' U R U R' U2 F' U F"
        }]
    }, {
        id: 24,
        algs: [{
            notation: "R' F' R U R U' R' F",
            label: "R' F' R U R U' R' F "
        }, {
            notation: "U' R' F R F' R U R'",
            label: "U' R' F R F' R U R'"
        }, {
            notation: "R' U' R' U' R' U R U R",
            label: "R' U' R' U' R' U R U R"
        }, {
            notation: "U' F' R U R' U' R' F R",
            label: "U' F' R U R' U' R' F R"
        }, {
            notation: "y U' L' U L y' U R U' R' y'",
            label: "y U' L' U L y' U R U' R'"
        }]
    }, {
        id: 25,
        algs: [{
            notation: "U R U' R' U' F' U F",
            label: "U R U' R' U' F' U F"
        }, {
            notation: "U R U' R' F R' F' R",
            label: "U R U' R' F R' F' R"
        }, {
            notation: "y r U r' U' r' F r F' y'",
            label: "y r U r' U' r' F r F'"
        }, {
            notation: "U R U' R' d' L' U L",
            label: "U R U' R' d' L' U L"
        }, {
            notation: "U R U R' U' y L' U' L",
            label: "U R U R' U' y L' U' L"
        }]
    }, {
        id: 26,
        algs: [{
            notation: "R U' R' U R U' R'",
            label: "R U' R' U R U' R'"
        }, {
            notation: "R U' R2 F R F'",
            label: "R U' R2 F R F'"
        }, {
            notation: "y L' U' L U2 F U' F' y'",
            label: "y L' U' L U2 F U' F'"
        }, {
            notation: "y' R' U' R U y U R U' R' y",
            label: "y' R' U' R U y U R U' R'"
        }]
    }, {
        id: 27,
        algs: [{
            notation: "R U R' U' F R' F' R",
            label: "R U R' U' F R' F' R"
        }, {
            notation: "y L' U L U' L' U L y'",
            label: "y L' U L U' L' U L"
        }, {
            notation: "y' R' U R U' R' U R y",
            label: "y' R' U R U' R' U R"
        }, {
            notation: "R U R' U2 F' U F",
            label: "R U R' U2 F' U F"
        }, {
            notation: "R U R' U2 F' U F",
            label: "R U R' U2 F' U F"
        }]
    }, {
        id: 28,
        algs: [{
            notation: "R' F R F' R' F R F'",
            label: "R' F R F' R' F R F'"
        }, {
            notation: "y L' U' L U L' U' L y'",
            label: "y L' U' L U L' U' L"
        }, {
            notation: "y' R' U' R U R' U' R y",
            label: "y' R' U' R U R' U' R"
        }, {
            notation: "M' U R U' r' U R U' R'",
            label: "M' U R U' r' U R U' R'"
        }, {
            notation: "U2 R U' R' y' R' U' R",
            label: "U2 R U' R' y' R' U' R"
        }]
    }, {
        id: 29,
        algs: [{
            notation: "R U R' U' R U R'",
            label: "R U R' U' R U R'"
        }, {
            notation: "F R' F' R F R' F' R",
            label: "F R' F' R F R' F' R"
        }, {
            notation: "y U' L' U' L U2 F U2 F' U F U' F' y'",
            label: "y U' L' U' L U2 F U2 F' U F U' F'"
        }]
    }, {
        id: 30,
        algs: [{
            notation: "U' R' F R F' R U' R'",
            label: "U' R' F R F' R U' R'"
        }, {
            notation: "R U' R' y L' U2 L",
            label: "R U' R' y L' U2 L"
        }, {
            notation: "R U' R' U2 F R' F' R",
            label: "R U' R' U2 F R' F' R"
        }, {
            notation: "l F' R U' R' U l'",
            label: "l F' R U' R' U l'"
        }, {
            notation: "R U' R' y' R' U2 R",
            label: "R U' R' y' R' U2 R"
        }]
    }, {
        id: 31,
        algs: [{
            notation: "R U R' U' R U R' U' R U R'",
            label: "R U R' U' R U R' U' R U R'"
        }, {
            notation: "U R U' R' U R U' R' U R U' R'",
            label: "U R U' R' U R U' R' U R U' R'"
        }, {
            notation: "R2 U R2 U R2 U2 R2",
            label: "R2 U R2 U R2 U2 R2"
        }, {
            notation: "U R U R' U' R U2 R' U R U' R'",
            label: "U R U R' U' R U2 R' U R U' R'"
        }, {
            notation: "R' F R F' R' F R F' R' F R F'",
            label: "R' F R F' R' F R F' R' F R F'"
        }]
    }, {
        id: 32,
        algs: [{
            notation: "U' R U' R' U2 R U' R'",
            label: "U' R U' R' U2 R U' R'"
        }, {
            notation: "U' R U' R' U R' F R F'",
            label: "U' R U' R' U R' F R F'"
        }, {
            notation: "y R' D R U' R' D' R y'",
            label: "y R' D R U' R' D' R"
        }, {
            notation: "R U R' U' R U' R' U R U' R'",
            label: "R U R' U' R U' R' U R U' R'"
        }, {
            notation: "U' R U' R' U' R U2 R'",
            label: "U' R U' R' U' R U2 R'"
        }]
    }, {
        id: 33,
        algs: [{
            notation: "U R U R' U2 R U R'",
            label: "U R U R' U2 R U R'"
        }, {
            notation: "U' R U2 R' U R U R'",
            label: "U' R U2 R' U R U R'"
        }, {
            notation: "y U L' U L U2 L' U L y'",
            label: "y U L' U L U2 L' U L"
        }, {
            notation: "y' U R' U R U2 R' U R y",
            label: "y' U R' U R U2 R' U R"
        }, {
            notation: "U' R' D' R U R' D R",
            label: "U' R' D' R U R' D R"
        }]
    }, {
        id: 34,
        algs: [{
            notation: "U' R U R' U F' U' F",
            label: "U' R U R' U F' U' F "
        }, {
            notation: "U2 R U R' F R' F' R",
            label: "U2 R U R' F R' F' R"
        }, {
            notation: "U M' U R U' r' R U' R'",
            label: "U M' U R U' r' R U' R'"
        }, {
            notation: "U' R U R' d R' U' R",
            label: "U' R U R' d R' U' R"
        }, {
            notation: "U2 R U' R' U' y' R' U' R",
            label: "U2 R U' R' U' y' R' U' R"
        }]
    }, {
        id: 35,
        algs: [{
            notation: "U2 R' F R F' U2 R U R'",
            label: "U2 R' F R F' U2 R U R'"
        }, {
            notation: "U F' U' F U' R U R'",
            label: "U F' U' F U' R U R'"
        }, {
            notation: "y U L' U' L y' U' R U R' y'",
            label: "y U L' U' L y' U' R U R'"
        }, {
            notation: "R2 u R U R' U' u' R' U R'",
            label: "R2 u R U R' U' u' R' U R'"
        }, {
            notation: "U2 F' U' F U R U' R'",
            label: "U2 F' U' F U R U' R'"
        }]
    }, {
        id: 36,
        algs: [{
            notation: "R2 U2 F R2 F' U2 R' U R'",
            label: "R2 U2 F R2 F' U2 R' U R'"
        }, {
            notation: "R U' R' d R' U2 R U2 R' U R",
            label: "R U' R' d R' U2 R U2 R' U R"
        }, {
            notation: "R U2 R' U R U2 R' U F' U' F",
            label: "R U2 R' U R U2 R' U F' U' F"
        }, {
            notation: "R' F R F' R U' R' U R U' R' U2 R U' R'",
            label: "R' F R F' R U' R' U R U' R' U2 R U' R'"
        }, {
            notation: "R U R' U2 R U2 R' U F' U' F",
            label: "R U R' U2 R U2 R' U F' U' F"
        }]
    }, {
        id: 37,
        algs: [{
            notation: "R U R' U' R U2 R' U' R U R'",
            label: "R U R' U' R U2 R' U' R U R'"
        }, {
            notation: "R U' R' U' R U R' U2 R U' R'",
            label: "R U' R' U' R U R' U2 R U' R'"
        }, {
            notation: "R2 U2 R' U' R U' R' U2 R'",
            label: "R2 U2 R' U' R U' R' U2 R'"
        }, {
            notation: "F R' F' R2 U2 R' U' R U R'",
            label: "F R' F' R2 U2 R' U' R U R'"
        }]
    }, {
        id: 38,
        algs: [{
            notation: "R U R' U2 R U' R' U R U R'",
            label: "R U R' U2 R U' R' U R U R'"
        }, {
            notation: "R U' R' U R U2 R' U R U' R'",
            label: "R U' R' U R U2 R' U R U' R'"
        }, {
            notation: "R U2 R U R' U R U2 R2",
            label: "R U2 R U R' U R U2 R2"
        }, {
            notation: "R U2 R' U R U' R' U R U R'",
            label: "R U2 R' U R U' R' U R U R'"
        }, {
            notation: "R F U R U' R' F' U' R'",
            label: "R F U R U' R' F' U' R'"
        }]
    }, {
        id: 39,
        algs: [{
            notation: "R U' R' F R U R' U' F' R U' R'",
            label: "R U' R' F R U R' U' F' R U' R'"
        }, {
            notation: "r U' r' U2 r U r' R U R'",
            label: "r U' r' U2 r U r' R U R'"
        }, {
            notation: "R F U R U' R' F' U' R'",
            label: "R F U R U' R' F' U' R'"
        }, {
            notation: "F' L' U2 L F R U R'",
            label: "F' L' U2 L F R U R'"
        }, {
            notation: "R U' R' U' R U' R' U F' U' F",
            label: "R U' R' U' R U' R' U F' U' F"
        }]
    }, {
        id: 40,
        algs: [{
            notation: "R U R' U' R U' R' U2 y' R' U' R y",
            label: "R U R' U' R U' R' U2 y' R' U' R"
        }, {
            notation: "R U F R U R' U' F' R'",
            label: "R U F R U R' U' F' R'"
        }, {
            notation: "R U' R' F' L' U2 L F",
            label: "R U' R' F' L' U2 L F"
        }, {
            notation: "R U' M' U' r' U2 r U r'",
            label: "R U' M' U' r' U2 r U r' "
        }, {
            notation: "R U' R' r U' r' U2 r U r'",
            label: "R U' R' r U' r' U2 r U r'"
        }]
    }
];

const getVisuals = (item, scheme = {}) => {
    const URL = 'http://cube.rider.biz/visualcube.php';
    const query = {
        fmt: 'svg',
        pzl: 3,
        size: 300,
        stage: 'f2l',
        bg: 't',
        cc: 'black',
        case: item.algs[0].notation.split(' ').join(''),
        sch: Object.keys(scheme).sort((a, b) => {
            const order = ['U', 'R', 'F', 'D', 'L', 'B'];

            return order.indexOf(a) - order.indexOf(b);
        }).map(e => scheme[e]).join()
    };

    return [URL + '?' + Object.keys(query).map((key) => {
        return key + '=' + query[key];
    }).join('&')];
}

export {
    name,
    key,
    list,
    getVisuals
}