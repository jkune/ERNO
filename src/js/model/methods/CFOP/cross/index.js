import { RELATIONS } from '../../../util/index.js';

function isCrossDone(args) {
    return args.faces.some((face, color) => {
        const sideRelations = RELATIONS[args.size][color];
        const faceCross = face.every((value, position) => {
            const odd = position % 2 == 0;

            return odd || value === color;
        });
        const sideCross = sideRelations.every((relationPair) => {
            const faceColor = relationPair[0]
            const facePositions = relationPair[1];
            const facePosition = facePositions[(facePositions.length - 1) / 2];

            return args.faces[faceColor][facePosition] === faceColor;
        })

        if (!args.baseFace && faceCross && sideCross) {
            args.setBaseFace(color);
        }

        return faceCross && sideCross;
    });
}

export { isCrossDone };