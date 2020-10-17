import { ORIENTATIONS, CUBEROTATIONMAPS, rotateFaceCW, rotateFaceCCW, rotateFace180 } from './util/index.js';
import { TURNS, ROTATIONS, FACES, DIRECTIONS } from '../util/index.js';
import { CubeModel } from './cube';
import methods from './methods'
import * as _ from 'underscore';

class Model {
    constructor(size) {
        this._size = size || 3;
        this._cubeModel = new CubeModel(this._size);
        this._currentOrientation = 0;
        this._moves = [];
        this._method = null;
        this._solution = null;
        this._isScrambling = true;
    }

    setScrambling(bol) {
        this._isScrambling = bol;
    }

    initMethod(args) {
        this._method = methods.find(e => e.id === args.methodId);
        this._solution = this._method.init({ 
            size: this._size, 
            step: args.stepId, 
            callback: args.callback, 
            baseFace: args.baseFace, 
            faces: this._cubeModel.getFacesArray() 
        });
    }

    reset(size = this._size) {
        this._cubeModel.reset(size);
        this._currentOrientation = 0;
        this._moves = [];
        this._isScrambling = true;
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

        this._moves.push(twist);

        if (!this._isScrambling && this._solution) 
            this._solution.onMove(twist, this._cubeModel.getFacesArray());

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
        // if (!this._isScrambling) this.checkSolve();

        return faceToRotate;
    }

    // isSolved() {
    //     const faces = this._cubeModel.getFacesArray();

    //     return faces.every((face) => {
    //         return face.every((position, i, array) => {
    //             return position === array[0];
    //         });
    //     });
    // }

    // isFaceDone() {
    //     const faces = this._cubeModel.getFacesArray();

    //     return faces.some((face, color) => {
    //         const sideRelations = RELATIONS[this._size][color];
    //         const faceDone = face.every((value) => {
    //             return value === face[0];
    //         });
    //         const sideDone = sideRelations.every((relationPair) => {
    //             const faceColor = relationPair[0]
    //             const facePositions = relationPair[1];
    //             const firstPositionColor = faces[faceColor][facePositions[0]];
    //             const centerColor = faces[faceColor][Math.round((faces[faceColor].length - 1) / 2)]
    //             const faceMainColor = this._size % 2 === 0 ? firstPositionColor : centerColor;

    //             return facePositions.every((facePosition) => {
    //                 return faces[faceColor][facePosition] === faceMainColor;
    //             });;
    //         })

    //         if (!this._baseFace && faceDone && sideDone) {
    //             this._baseFace = color;
    //         }

    //         return faceDone && sideDone;
    //     });
    // }
}

export { Model }
