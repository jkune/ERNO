import { getOppositeFace } from '../../../util/index.js';

function isOLLDone(args) {
    const ollFace = getOppositeFace(args.baseFace);

    return args.faces[ollFace].every((value) => {
        return value === args.faces[ollFace][0];
    });
}

export { isOLLDone };