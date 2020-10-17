import { RELATIONS, getOppositeFace } from '../../../util/index.js';

function isPLLDone(args) {
    const ollFace = getOppositeFace(args.baseFace);
    const sideRelations = RELATIONS[args.size][ollFace];

    return sideRelations.every((relationPair) => {
        const faceColor = relationPair[0]
        const facePositions = relationPair[1];
        const firstPositionColor = args.faces[faceColor][facePositions[0]];
        const centerColor = args.faces[faceColor][Math.round((args.faces[faceColor].length - 1) / 2)]
        const faceMainColor = args.size % 2 === 0 ? firstPositionColor : centerColor;

        return facePositions.every((facePosition) => {
            return args.faces[faceColor][facePosition] === faceMainColor;
        });;
    })
}

export { isPLLDone };