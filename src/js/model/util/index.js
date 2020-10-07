import * as _ from 'underscore';
import { ROTATIONS, FACES, DIRECTIONS } from '../../util/index.js';

const E_FACES = generateFaces(),
    FACESMATRIX = generateFacesMatrix(),
    FACEARRAYCW = getCWArrayFaces(FACESMATRIX),
    FACEARRAYCCW = getCCWArrayFaces(FACESMATRIX),
    FACEARRAY180 = get180ArrayFaces(FACESMATRIX),
    // An array of all the pieces that make up the cube.
    PIECELOCATIONS = [
        [[FACES.TOP, 0], [FACES.LEFT, 0], [FACES.BACK, 2]],
        [[FACES.TOP, 2], [FACES.BACK, 0], [FACES.RIGHT, 2]],
        [[FACES.TOP, 6], [FACES.LEFT, 2], [FACES.FRONT, 0]],
        [[FACES.TOP, 8], [FACES.FRONT, 2], [FACES.RIGHT, 0]],
        [[FACES.BOTTOM, 0], [FACES.LEFT, 8], [FACES.FRONT, 6]],
        [[FACES.BOTTOM, 2], [FACES.FRONT, 8], [FACES.RIGHT, 6]],
        [[FACES.BOTTOM, 6], [FACES.LEFT, 6], [FACES.BACK, 8]],
        [[FACES.BOTTOM, 8], [FACES.BACK, 6], [FACES.RIGHT, 8]],
        [[FACES.TOP, 1], [FACES.BACK, 1]],
        [[FACES.TOP, 3], [FACES.LEFT, 1]],
        [[FACES.TOP, 5], [FACES.RIGHT, 1]],
        [[FACES.TOP, 7], [FACES.FRONT, 1]],
        [[FACES.BOTTOM, 1], [FACES.FRONT, 7]],
        [[FACES.BOTTOM, 3], [FACES.LEFT, 7]],
        [[FACES.BOTTOM, 5], [FACES.RIGHT, 7]],
        [[FACES.BOTTOM, 7], [FACES.BACK, 7]],
        [[FACES.LEFT, 5], [FACES.FRONT, 3]],
        [[FACES.FRONT, 5], [FACES.RIGHT, 3]],
        [[FACES.RIGHT, 5], [FACES.BACK, 3]],
        [[FACES.BACK, 5], [FACES.LEFT, 3]]
    ],
    RELATIONS = getFacesRelations(FACESMATRIX),
    /**
        All possible orientations of the cube.
        Orientations are described with an orde2 pair
        indicating what face is at the top and what face
        is to the left.
    **/
    ORIENTATIONS = {
        // [Top,Left]
        0: [
            // Key is the face, the pair is what face will be put on that face and how you'll have to rotate the original face to make it fit.
            [FACES.TOP, DIRECTIONS.NOROTATE],
            [FACES.LEFT, DIRECTIONS.NOROTATE],
            [FACES.FRONT, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.NOROTATE],
            [FACES.BACK, DIRECTIONS.NOROTATE],
            [FACES.BOTTOM, DIRECTIONS.NOROTATE]
        ],
        // [Top,Front]
        1: [
            [FACES.TOP, DIRECTIONS.CW],
            [FACES.FRONT, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.NOROTATE],
            [FACES.BACK, DIRECTIONS.NOROTATE],
            [FACES.LEFT, DIRECTIONS.NOROTATE],
            [FACES.BOTTOM, DIRECTIONS.CCW]
        ],
        // [Top,Right]
        2: [
            [FACES.TOP, DIRECTIONS.FLIP],
            [FACES.RIGHT, DIRECTIONS.NOROTATE],
            [FACES.BACK, DIRECTIONS.NOROTATE],
            [FACES.LEFT, DIRECTIONS.NOROTATE],
            [FACES.FRONT, DIRECTIONS.NOROTATE],
            [FACES.BOTTOM, DIRECTIONS.FLIP]
        ],
        // [Top,Back]
        3: [
            [FACES.TOP, DIRECTIONS.CCW],
            [FACES.BACK, DIRECTIONS.NOROTATE],
            [FACES.LEFT, DIRECTIONS.NOROTATE],
            [FACES.FRONT, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.NOROTATE],
            [FACES.BOTTOM, DIRECTIONS.CW]
        ],
        // [Front,Left]
        4: [
            [FACES.FRONT, DIRECTIONS.NOROTATE],
            [FACES.LEFT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.FLIP],
            [FACES.BACK, DIRECTIONS.FLIP]
        ],
        // [Front,Bottom]
        5: [
            [FACES.FRONT, DIRECTIONS.CW],
            [FACES.BOTTOM, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CCW],
            [FACES.BACK, DIRECTIONS.CW]
        ],
        // [Front,Right]
        6: [
            [FACES.FRONT, DIRECTIONS.FLIP],
            [FACES.RIGHT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.NOROTATE],
            [FACES.BACK, DIRECTIONS.NOROTATE]
        ],
        // [Front,Top]
        7: [
            [FACES.FRONT, DIRECTIONS.CCW],
            [FACES.TOP, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CW],
            [FACES.BACK, DIRECTIONS.CCW]
        ],
        // [Bottom,Left]
        8: [
            [FACES.BOTTOM, DIRECTIONS.NOROTATE],
            [FACES.LEFT, DIRECTIONS.FLIP],
            [FACES.BACK, DIRECTIONS.FLIP],
            [FACES.RIGHT, DIRECTIONS.FLIP],
            [FACES.FRONT, DIRECTIONS.FLIP],
            [FACES.TOP, DIRECTIONS.NOROTATE]
        ],
        // [Bottom,Back]
        9: [
            [FACES.BOTTOM, DIRECTIONS.CW],
            [FACES.BACK, DIRECTIONS.FLIP],
            [FACES.RIGHT, DIRECTIONS.FLIP],
            [FACES.FRONT, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.FLIP],
            [FACES.TOP, DIRECTIONS.CCW]
        ],
        // [Bottom,Right]
        10: [
            [FACES.BOTTOM, DIRECTIONS.FLIP],
            [FACES.RIGHT, DIRECTIONS.FLIP],
            [FACES.FRONT, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.FLIP],
            [FACES.BACK, DIRECTIONS.FLIP],
            [FACES.TOP, DIRECTIONS.FLIP]
        ],
        // [Bottom,Front]
        11: [
            [FACES.BOTTOM, DIRECTIONS.CCW],
            [FACES.FRONT, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.FLIP],
            [FACES.BACK, DIRECTIONS.FLIP],
            [FACES.RIGHT, DIRECTIONS.FLIP],
            [FACES.TOP, DIRECTIONS.CW]
        ],
        // [Back,Left]
        12: [
            [FACES.BACK, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.FLIP],
            [FACES.FRONT, DIRECTIONS.NOROTATE]
        ],
        // [Back,Top]
        13: [
            [FACES.BACK, DIRECTIONS.CCW],
            [FACES.TOP, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CW],
            [FACES.FRONT, DIRECTIONS.CCW]
        ],
        // [Back,Right]
        14: [
            [FACES.BACK, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.NOROTATE],
            [FACES.FRONT, DIRECTIONS.FLIP]
        ],
        // [Back,Bottom]
        15: [
            [FACES.BACK, DIRECTIONS.CW],
            [FACES.BOTTOM, DIRECTIONS.FLIP],
            [FACES.LEFT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.NOROTATE],
            [FACES.RIGHT, DIRECTIONS.CCW],
            [FACES.FRONT, DIRECTIONS.CW]
        ],
        // [Right,Front]
        16: [
            [FACES.RIGHT, DIRECTIONS.NOROTATE],
            [FACES.FRONT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.CCW],
            [FACES.BACK, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.CCW],
            [FACES.LEFT, DIRECTIONS.FLIP]
        ],
        // [Right,Bottom]
        17: [
            [FACES.RIGHT, DIRECTIONS.CW],
            [FACES.BOTTOM, DIRECTIONS.CCW],
            [FACES.BACK, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.CCW],
            [FACES.FRONT, DIRECTIONS.CCW],
            [FACES.LEFT, DIRECTIONS.CW]
        ],
        // [Right,Back]
        18: [
            [FACES.RIGHT, DIRECTIONS.FLIP],
            [FACES.BACK, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.CCW],
            [FACES.FRONT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.CCW],
            [FACES.LEFT, DIRECTIONS.NOROTATE]
        ],
        // [Right,Top]
        19: [
            [FACES.RIGHT, DIRECTIONS.CCW],
            [FACES.TOP, DIRECTIONS.CCW],
            [FACES.FRONT, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.CCW],
            [FACES.BACK, DIRECTIONS.CW],
            [FACES.LEFT, DIRECTIONS.CCW]
        ],
        // [Left,Front]
        20: [
            [FACES.LEFT, DIRECTIONS.FLIP],
            [FACES.FRONT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.CW],
            [FACES.BACK, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.CW],
            [FACES.RIGHT, DIRECTIONS.NOROTATE]
        ],
        // [Left,Top]
        21: [
            [FACES.LEFT, DIRECTIONS.CCW],
            [FACES.TOP, DIRECTIONS.CW],
            [FACES.BACK, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.CW],
            [FACES.FRONT, DIRECTIONS.CW],
            [FACES.RIGHT, DIRECTIONS.CCW]
        ],
        // [Left,Back]
        22: [
            [FACES.LEFT, DIRECTIONS.NOROTATE],
            [FACES.BACK, DIRECTIONS.CCW],
            [FACES.BOTTOM, DIRECTIONS.CW],
            [FACES.FRONT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.CW],
            [FACES.RIGHT, DIRECTIONS.FLIP]
        ],
        // [Left,Bottom]
        23: [
            [FACES.LEFT, DIRECTIONS.CW],
            [FACES.BOTTOM, DIRECTIONS.CW],
            [FACES.FRONT, DIRECTIONS.CW],
            [FACES.TOP, DIRECTIONS.CW],
            [FACES.BACK, DIRECTIONS.CCW],
            [FACES.RIGHT, DIRECTIONS.CW]
        ]
    },

    ROTATECUBE_X_MAP = {
        0: 4,
        1: 16,
        2: 14,
        3: 22,
        4: 8,
        5: 17,
        6: 2,
        7: 21,
        8: 12,
        9: 18,
        10: 6,
        11: 20,
        12: 0,
        13: 19,
        14: 10,
        15: 23,
        16: 11,
        17: 15,
        18: 3,
        19: 7,
        20: 1,
        21: 13,
        22: 9,
        23: 5
    },
    ROTATECUBE_INVERSE_X_MAP = _.invert(ROTATECUBE_X_MAP),
    ROTATECUBE_DOUBLE_X_MAP = getDoubleMap(ROTATECUBE_X_MAP),

    ROTATECUBE_Y_MAP = {
        0: 1,
        1: 2,
        2: 3,
        3: 0,
        4: 5,
        5: 6,
        6: 7,
        7: 4,
        8: 9,
        9: 10,
        10: 11,
        11: 8,
        12: 13,
        13: 14,
        14: 15,
        15: 12,
        16: 17,
        17: 18,
        18: 19,
        19: 16,
        20: 21,
        21: 22,
        22: 23,
        23: 20
    },
    ROTATECUBE_INVERSE_Y_MAP = _.invert(ROTATECUBE_Y_MAP),
    ROTATECUBE_DOUBLE_Y_MAP = getDoubleMap(ROTATECUBE_Y_MAP),

    ROTATECUBE_Z_MAP = {
        0: 23,
        1: 5,
        2: 17,
        3: 15,
        4: 22,
        5: 9,
        6: 18,
        7: 3,
        8: 21,
        9: 13,
        10: 19,
        11: 7,
        12: 20,
        13: 1,
        14: 16,
        15: 11,
        16: 4,
        17: 8,
        18: 12,
        19: 0,
        20: 6,
        21: 2,
        22: 14,
        23: 10,
    },
    ROTATECUBE_INVERSE_Z_MAP = _.invert(ROTATECUBE_Z_MAP),
    ROTATECUBE_DOUBLE_Z_MAP = getDoubleMap(ROTATECUBE_Z_MAP),

    CUBEROTATIONMAPS = {};

CUBEROTATIONMAPS[ROTATIONS.X] = ROTATECUBE_X_MAP;
CUBEROTATIONMAPS[ROTATIONS.INVERSE_X] = ROTATECUBE_INVERSE_X_MAP;
CUBEROTATIONMAPS[ROTATIONS.DOUBLE_X] = ROTATECUBE_DOUBLE_X_MAP;

CUBEROTATIONMAPS[ROTATIONS.Y] = ROTATECUBE_Y_MAP;
CUBEROTATIONMAPS[ROTATIONS.INVERSE_Y] = ROTATECUBE_INVERSE_Y_MAP;
CUBEROTATIONMAPS[ROTATIONS.DOUBLE_Y] = ROTATECUBE_DOUBLE_Y_MAP;

CUBEROTATIONMAPS[ROTATIONS.Z] = ROTATECUBE_Z_MAP;
CUBEROTATIONMAPS[ROTATIONS.INVERSE_Z] = ROTATECUBE_INVERSE_Z_MAP;
CUBEROTATIONMAPS[ROTATIONS.DOUBLE_Z] = ROTATECUBE_DOUBLE_Z_MAP;

function getDoubleMap(map) {
    const result = {};

    Object.keys(map).map((key, index) => {
        result[index] = map[map[key]];
    });

    return result;
}

function generateFaces() {
    const faces = Array.apply(null, Array(6)).map((value1, size) => {
        return Array.apply(null, Array(6)).map((value2, color) => {
            const arrayLength = size * size;

            return Array.apply(null, Array(arrayLength)).map(val2 => color);
        });
    });

    delete faces[0];

    return { ...faces };
}

function generateFacesMatrix() {
    const faces = Array.apply(null, Array(6)).map((value1, size) => {
        return Array.apply(null, Array(6)).map((value2, color) => {
            return Array.apply(null, Array(size)).map((value3, index) => {
                return Array.apply(null, Array(size)).map((value3, index2) => {
                    return index * size + index2;
                });
            });
        });
    });

    delete faces[0];

    return { ...faces };
}

function getCWArrayFaces(faces) {
    const converted = {}

    Object.keys(faces).forEach((key) => {
        converted[key] = getCWArrayFace(faces[key][0]);
    });

    return converted;
}

function getCCWArrayFaces(faces) {
    const converted = {}

    Object.keys(faces).forEach((key) => {
        converted[key] = getCCWArrayFace(faces[key][0]);
    });

    return converted;
}

function get180ArrayFaces(faces) {
    const converted = {}

    Object.keys(faces).forEach((key) => {
        converted[key] = get180ArrayFace(faces[key][0]);
    });

    return converted;
}

function getCWArrayFace(face) {
    const converted = face.map(function (arr) {
        return arr.slice();
    });

    for (let i = 0; i < face.length; i++) {
        for (let j = 0; j < face[i].length; j++) {
            converted[j][face[i].length - 1 - i] = face[i][j];
        }
    }

    return converted.reduce((t, e) => { t = t.concat(e); return t }, []);
}

function getCCWArrayFace(face) {
    const converted = face.map(function (arr) {
        return arr.slice();
    });

    for (let i = 0; i < face.length; i++) {
        for (let j = 0; j < face[i].length; j++) {
            converted[face[i].length - 1 - j][i] = face[i][j];
        }
    }

    return converted.reduce((t, e) => { t = t.concat(e); return t }, []);
}

function get180ArrayFace(face) {
    const converted = face.map(function (arr) {
        return arr.slice();
    });

    for (let i = 0; i < face.length; i++) {
        for (let j = 0; j < face[i].length; j++) {
            converted[face[i].length - 1 - i][face[j].length - 1 - j] = face[i][j];
        }
    }

    return converted.reduce((t, e) => { t = t.concat(e); return t }, []);
}

function getFacesRelations(faces) {
    const converted = {}

    Object.keys(faces).forEach((key) => {
        converted[key] = getFaceRelations(faces[key][0]);
    });

    return converted;
}

function getFaceRelations(face) {
    const offset = face.length - 1;
    const result = {};
    const sideRelations = {
        [FACES.TOP]: [
            [FACES.BACK, { i: 0, order: 0 }],
            [FACES.RIGHT, { i: 0, order: 0 }],
            [FACES.FRONT, { i: 0, order: 0 }],
            [FACES.LEFT, { i: 0, order: 0 }],
        ],
        [FACES.LEFT]: [
            [FACES.TOP, { j: 0, order: 1 }],
            [FACES.FRONT, { j: 0, order: 1 }],
            [FACES.BOTTOM, { j: 0, order: 1 }],
            [FACES.BACK, { j: 1, order: 0 }],
        ],
        [FACES.FRONT]: [
            [FACES.TOP, { i: 1, order: 1 }],
            [FACES.RIGHT, { j: 0, order: 1 }],
            [FACES.BOTTOM, { i: 0, order: 0 }],
            [FACES.LEFT, { j: 1, order: 0 }],
        ],
        [FACES.RIGHT]: [
            [FACES.TOP, { j: 1, order: 0 }],
            [FACES.BACK, { j: 0, order: 1 }],
            [FACES.BOTTOM, { j: 1, order: 0 }],
            [FACES.FRONT, { j: 1, order: 0 }],
        ],
        [FACES.BACK]: [
            [FACES.TOP, { i: 0, order: 0 }],
            [FACES.LEFT, { j: 0, order: 1 }],
            [FACES.BOTTOM, { i: 1, order: 1 }],
            [FACES.RIGHT, { j: 1, order: 0 }],
        ],
        [FACES.BOTTOM]: [
            [FACES.FRONT, { i: 1, order: 1 }],
            [FACES.RIGHT, { i: 1, order: 1 }],
            [FACES.BACK, { i: 1, order: 1 }],
            [FACES.LEFT, { i: 1, order: 1 }],
        ],
    };

    Object.keys(sideRelations).forEach((key) => {
        const relations = [];
        const sideRelation = sideRelations[key];

        sideRelation.forEach((rel) => {
            const positions = [];
            const key2 = rel[0];
            const item = rel[1];

            for (let k = 0; k < face.length; k++) {
                const i = item.hasOwnProperty('i') ? item.i * offset : k;
                const j = item.hasOwnProperty('j') ? item.j * offset : k;

                item.order ? positions.push(face[i][j]) : positions.unshift(face[i][j])
            }

            relations.push([key2, positions])
        });

        result[key] = relations;
    });

    return result;
}

var rotateFaceCW = function(face) {
    const size = Math.sqrt(face.length);

    return Array.apply(null, Array(face.length)).map((value, index) => {
        return face[FACEARRAYCW[size][index]];
    });
};

var rotateFaceCCW = function(face) {
    const size = Math.sqrt(face.length);

    return Array.apply(null, Array(face.length)).map((value, index) => {
        return face[FACEARRAYCCW[size][index]];
    });
};

var rotateFace180 = function(face) {
    const size = Math.sqrt(face.length);

    return Array.apply(null, Array(face.length)).map((value, index) => {
        return face[FACEARRAY180[size][index]];
    });
};

var getOppositeFace = function(faceColor) {
    const possibleSides = [
        FACES.TOP,
        FACES.LEFT,
        FACES.FRONT,
        FACES.RIGHT,
        FACES.BACK,
        FACES.BOTTOM,
    ];
    const faceRelations = RELATIONS[1][faceColor].map(e => e[0]);
    
    return possibleSides.find(e => e !== faceColor && !faceRelations.includes(e));
}

var getFaceAdjacentPositions = function(values, size) {
    const length = size - 1;
    const positions = [];
    const newPositions = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            for (let h = 0; h < values.length; h++) {
                if (size * i + j === values[h]) {
                    positions[h] = [i, j];
                }
            }
        }
    }

    const sameI = positions.every(e => e[0] === positions[0][0]);

    for (let k = 0; k < positions.length; k++) {
        let aux1 = 0;
        let aux2 = 0;

        if (sameI) {
            aux2 = positions[k][1];
            aux1 = (positions[k][0] === length) ? (length - 1) : 1
        } else {
            aux1 = positions[k][0];
            aux2 = (positions[k][1] === length) ? (length - 1) : 1
        }

        newPositions[k] = aux1 * size + aux2;
    }

    return newPositions;
}

function getFaceBySize(size = 3) {
    return E_FACES[size] || E_FACES[3];
}

export {
    RELATIONS,
    ORIENTATIONS,
    CUBEROTATIONMAPS,
    PIECELOCATIONS,

    getFaceBySize,
    rotateFaceCW,
    rotateFaceCCW,
    rotateFace180,
    getOppositeFace,
    getFaceAdjacentPositions,
}