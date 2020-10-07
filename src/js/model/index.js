import { RELATIONS, ORIENTATIONS, CUBEROTATIONMAPS, rotateFaceCW, rotateFaceCCW, rotateFace180, getOppositeFace, getFaceAdjacentPositions } from './util/index.js';
import { TURNS, ROTATIONS, FACES, DIRECTIONS } from '../util/index.js';
import { CubeModel } from './cube';
import * as _ from 'underscore';

class Model {
    constructor(size) {
        this._size = size || 3;
        this._cubeModel = new CubeModel(this._size);
        this._currentOrientation = 0;
        this._moves = [];
        this._isScrambling = true;
        this._baseFace = null;
        this._isSolved = false;
        this._isFaceDone = false;
        this._isCrossDone = false;
        this._isF2LDone = false;
        this._isOLLDone = false;
        this._isF2LPairDone = [false, false, false, false];
    }

    doTwists(twists) {
        return twists.map((e) => {
            return this.doTwist(e);
        });
    }

    doTwist(twist) {
        const simpleTwist = twist.charAt(0);
        const direction = this.getDirectionFromMove(twist);
        const myTwist = {
            simpleTwist: simpleTwist,
            twist: twist,
            direction: direction,
        };

        // 1. Diferenciar tipo (TURN O ROTATION)
        if (TURNS.LIST.includes(twist)) { // 1.1 // TURN, REALIZAR MOVE Y DEVOLVER FACE
            const turn = this.getTurn(myTwist.simpleTwist);
            const orientedFace = this.rotateFace({ face: turn.face, direction: direction, deep: turn.deep, extra: turn.extra });

            myTwist.type = TURNS.TYPE;
            myTwist.face = orientedFace;
            myTwist.deep = turn.deep;
            myTwist.extra = turn.extra;

        } else if (ROTATIONS.LIST.includes(twist)) { // 1.2 // ROTATION, REALIZAR ROTATION Y DEVOLVER 
            myTwist.type = ROTATIONS.TYPE;
            this.rotateCube(twist);
        }

        return myTwist;
    }

    getTurn(turn) {
        switch (turn) {
            case TURNS.U:
                return { face: FACES.TOP };
            case TURNS.L:
                return { face: FACES.LEFT };
            case TURNS.F:
                return { face: FACES.FRONT };
            case TURNS.R:
                return { face: FACES.RIGHT };
            case TURNS.B:
                return { face: FACES.BACK };
            case TURNS.D:
                return { face: FACES.BOTTOM };
            case TURNS.M:
                return { face: FACES.LEFT, deep: true };
            case TURNS.E:
                return { face: FACES.BOTTOM, deep: true };
            case TURNS.S:
                return { face: FACES.FRONT, deep: true };
            case TURNS.u:
                return { face: FACES.TOP, extra: true };
            case TURNS.l:
                return { face: FACES.LEFT, extra: true }
            case TURNS.f:
                return { face: FACES.FRONT, extra: true }
            case TURNS.r:
                return { face: FACES.RIGHT, extra: true }
            case TURNS.b:
                return { face: FACES.BACK, extra: true }
            case TURNS.d:
                return { face: FACES.BOTTOM, extra: true }
        }
    }

    getDirectionFromMove(move) {
        const direction = move.charAt(1);

        switch (direction) {
            case '2':
                return DIRECTIONS.FLIP;
            case '\'':
                return DIRECTIONS.CCW;
            default:
                return DIRECTIONS.CW;
        }
    }

    reset() {
        this._isScrambling = false;
        this._baseFace = null;
        this._isSolved = false;
        this._isFaceDone = false;
        this._isCrossDone = false;
        this._isF2LDone = false;
        this._isOLLDone = false;
        this._isF2LPairDone = [false, false, false, false];
    }

    getFacesArray() {
        var faces = this._cubeModel.getFacesArray();
        var modifiedFaces = [];
        var orientationObject = ORIENTATIONS[this._currentOrientation];
        _.each(orientationObject, function (newPositionPair, faceNumber) {
            modifiedFaces[faceNumber] = faces[newPositionPair[0]];

            switch (newPositionPair[1]) {
                case DIRECTIONS.NOROTATE:
                    // Nothing to do!
                    break;
                case DIRECTIONS.CW:
                    modifiedFaces[faceNumber] = rotateFaceCW(modifiedFaces[faceNumber]);
                    break;
                case DIRECTIONS.CCW:
                    modifiedFaces[faceNumber] = rotateFaceCCW(modifiedFaces[faceNumber]);
                    break;
                case DIRECTIONS.FLIP:
                    modifiedFaces[faceNumber] = rotateFace180(modifiedFaces[faceNumber]);
                    break;
            }
        });

        return modifiedFaces;
    }

    getTotalMoves() {
        return _.clone(this._moves);
    }

    getTotalMovesSimplified() {
        return this._cubeModel.getMoves();
    }

    rotateCube(direction) {
        this._currentOrientation = CUBEROTATIONMAPS[direction][this._currentOrientation];
    }

    rotateFace(args) {
        var orientationPairs = ORIENTATIONS[this._currentOrientation];
        var faceToRotate = orientationPairs[args.face][0];

        this._cubeModel.rotateFace(Object.assign({}, args, {face: faceToRotate}));
        if (!this._isScrambling) this.checkSolve();

        return faceToRotate;
    }

    isSolved() {
        const faces = this._cubeModel.getFacesArray();

        return faces.every((face) => {
            return face.every((position, i, array) => {
                return position === array[0];
            });
        });
    }

    isOLLDone() {
        const faces = this._cubeModel.getFacesArray();
        const ollFace = getOppositeFace(this._baseFace);

        return faces[ollFace].every((value) => {
            return value === faces[ollFace][0];
        });
    }

    isPLLDone() {
        const faces = this._cubeModel.getFacesArray();
        const ollFace = getOppositeFace(this._baseFace);
        const sideRelations = RELATIONS[this._size][ollFace];

        return sideRelations.every((relationPair) => {
            const faceColor = relationPair[0]
            const facePositions = relationPair[1];
            const firstPositionColor = faces[faceColor][facePositions[0]];

            return facePositions.every((facePosition) => {
                return faces[faceColor][facePosition] === firstPositionColor;
            });;
        })
    }

    checkF2LPairs() {
        const baseFaceSideRelations = RELATIONS[this._size][this._baseFace];
        const faces = this._cubeModel.getFacesArray();
        const pairsDone = [
            [false, false],
            [false, false],
            [false, false],
            [false, false],
        ];

        baseFaceSideRelations.forEach((relationPair, index) => {
            const faceColor = relationPair[0]
            const facePositions = [relationPair[1][0], relationPair[1][relationPair[1].length - 1]];
            const f2LFacePositions = getFaceAdjacentPositions(facePositions, this._size);
            const nextIndex = (index + 1) % 4; // revisar
            const indexes = [index, nextIndex];

            f2LFacePositions.forEach((position, k) => {
                const pos = f2LFacePositions.length - 1 - k;
                pairsDone[indexes[k]][pos] = faces[faceColor][position] === faceColor;
            });
        });

        pairsDone.forEach((pairs, index) => {
            this._isF2LPairDone[index] = pairs.every(e => e);
        });

        this._isF2LDone = this._isF2LPairDone.every(e => e);
    }

    isF2LDone() {
        const faces = this._cubeModel.getFacesArray();
        const ollFace = getOppositeFace(this._baseFace);
        const ollFaceSideRelations = RELATIONS[this._size][ollFace];

        return ollFaceSideRelations.every((relationPair) => {
            const faceColor = relationPair[0]
            const facePositions = relationPair[1];

            return faces[faceColor].every((value, index) => {
                return facePositions.includes(index) || value === faceColor;
            });
        });
    }

    isFaceDone() {
        const faces = this._cubeModel.getFacesArray();

        return faces.some((face, color) => {
            const sideRelations = RELATIONS[this._size][color];
            const faceDone = face.every((value) => {
                return value === face[0];
            });
            const sideDone = sideRelations.every((relationPair) => {
                const faceColor = relationPair[0]
                const facePositions = relationPair[1];
                const firstPositionColor = faces[faceColor][facePositions[0]];
                const centerColor = faces[faceColor][Math.round((faces[faceColor].length - 1) / 2)]
                const faceMainColor = this._size % 2 === 0 ? firstPositionColor : centerColor;

                return facePositions.every((facePosition) => {
                    return faces[faceColor][facePosition] === faceMainColor;
                });;
            })

            if (!this._baseFace && faceDone && sideDone) {
                this._baseFace = color;
            }

            return faceDone && sideDone;
        });
    }

    isCrossDone() {
        const faces = this._cubeModel.getFacesArray();

        return faces.some((face, color) => {
            const sideRelations = RELATIONS[this._size][color];
            const faceCross = face.every((value, position) => {
                const odd = position % 2 == 0;

                return odd || value === color;
            });
            const sideCross = sideRelations.every((relationPair) => {
                const faceColor = relationPair[0]
                const facePositions = relationPair[1];
                const facePosition = facePositions[(facePositions.length - 1) / 2];

                return faces[faceColor][facePosition] === faceColor;
            })

            if (!this._baseFace && faceCross && sideCross) {
                this._baseFace = color;
            }

            return faceCross && sideCross;
        });
    }

    checkSolve(bool) {
        this._isCrossDone = this.isCrossDone();
        this._isFaceDone = this.isFaceDone();
        this._isCrossDone && this.checkF2LPairs();
        this._isOLLDone = this._isF2LDone && this.isOLLDone();
        this._isPLLDone = this._isOLLDone && this.isPLLDone();
        this._isSolved = this._isOLLDone && this.isSolved();

        if (bool) {
            console.log('Base face: ', this._baseFace);
            console.log('Cross: ', this._isCrossDone);
            console.log('Face: ', this._isFaceDone);
            console.log('F2L-1: ', this._isF2LPairDone[0]);
            console.log('F2L-2: ', this._isF2LPairDone[1]);
            console.log('F2L-3: ', this._isF2LPairDone[2]);
            console.log('F2L-4: ', this._isF2LPairDone[3]);
            console.log('F2L: ', this._isF2LDone);
            console.log('OLL: ', this._isOLLDone);
            console.log('PLL: ', this._isSolved);
            console.log('Solved: ', this._isSolved);
        }
    }
}

export { Model }
