import { RELATIONS } from '../../../util/index.js';

function isPLLDone(args) {
    const sideRelations = RELATIONS[2][args.baseFace];

    return sideRelations.every((relationPair) => {
        const faceColor = relationPair[0];

        return args.faces[faceColor].every((value, position) => {
            return value === args.faces[faceColor][position];
        });
    })
}

export { isPLLDone };