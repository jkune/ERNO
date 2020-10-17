import { RELATIONS, getOppositeFace, getFaceAdjacentPositions } from '../../../util/index.js';
import { F2L_PAIR_1, F2L_PAIR_2, F2L_PAIR_3, F2L_PAIR_4 } from '../../../../util/methods/index.js';

function isF2LDone(args) {
    const ollFace = getOppositeFace(args.baseFace);
    const ollFaceSideRelations = RELATIONS[args.size][ollFace];

    return ollFaceSideRelations.every((relationPair) => {
        const faceColor = relationPair[0]
        const facePositions = relationPair[1];
        const firstPositionColor = args.faces[faceColor][facePositions[0]];
        const centerColor = args.faces[faceColor][Math.round((args.faces[faceColor].length - 1) / 2)]
        const faceMainColor = args.size % 2 === 0 ? firstPositionColor : centerColor;

        return args.faces[faceColor].every((value, index) => {
            return facePositions.includes(index) || value === faceMainColor;
        });
    });
}

function isF2LPairDone(args) {
    const baseFaceSideRelations = RELATIONS[args.size][args.baseFace];
    const pairsDone = [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
    ];
    const f2LPairs = [
        false, 
        false,
        false,
        false,
    ];

    baseFaceSideRelations.forEach((relationPair, index) => {
        const faceColor = relationPair[0]
        const facePositions = [relationPair[1][0], relationPair[1][relationPair[1].length - 1]];
        const f2LFacePositions = getFaceAdjacentPositions(facePositions, args.size);
        const nextIndex = (index + 1) % 4;
        const indexes = [index, nextIndex];

        f2LFacePositions.forEach((position, k) => {
            const pos = f2LFacePositions.length - 1 - k;
            
            pairsDone[indexes[k]][pos] = args.faces[faceColor][position] === faceColor && args.faces[faceColor][facePositions[k]] === faceColor;
        });
    });

    pairsDone.forEach((pairs, index) => {
        f2LPairs[index] = pairs.every(e => e);
    });

    const pairsNumber = f2LPairs.filter(e => e).length;

    switch (args.id) {
        case F2L_PAIR_1:
            return pairsNumber >= 1;
        case F2L_PAIR_2:
            return pairsNumber >= 2;
        case F2L_PAIR_3:
            return pairsNumber >= 3;
        case F2L_PAIR_4:
            return pairsNumber == 4;
    }
}

export { isF2LDone, isF2LPairDone };