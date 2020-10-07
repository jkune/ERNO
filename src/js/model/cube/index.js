/**
          top(0)
        ~~~~~~~~~
        | 0 1 2 |
        | 3 4 5 |
 left(1)| 6 7 8 | right(3) back(4)
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  0 1 2 | 0 1 2 | 0 1 2 | 0 1 2 |
  3 4 5 | 3 4 5 | 3 4 5 | 3 4 5 |
  6 7 8 | 6 7 8 | 6 7 8 | 6 7 8 |
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        | 0 1 2 |
        | 3 4 5 |
        | 6 7 8 |
        ~~~~~~~~~
        bottom(5)

 *front(2)
 **/
import { DIRECTIONS } from '../../util/index.js';
import { RELATIONS, getFaceBySize, rotateFaceCW, rotateFaceCCW, getFaceAdjacentPositions } from '../util/index.js';
import * as  _ from 'underscore';

/**
 Faces will be an array of 6 arrays, with numbers 0-5. The constant
 values TOP,LEFT,FRONT,RIGHT,BACK, and BOTTOM are used to get the
 array representing the specified faces from the faces array.
 **/
class CubeModel {
    constructor(size) {
        const faces = getFaceBySize(size);

        this._faces = _.map(faces, function(face) {
            return _.clone(face)
        });
        this._moves = [];
    }

    getFacesArray() {
        return _.clone(this._faces);
    }

    _rotateClockWise(args) {
        var thisFace = this._faces[args.face];
        var size = Math.sqrt(thisFace.length)
        var faceRelations = RELATIONS[size][args.face];

        if (!args.deep) {
            this._faces[args.face] = rotateFaceCW(thisFace);

            this.changePositionValues(faceRelations);
        }
        
        if (args.deep || args.extra) {
            this.changePositionValues(faceRelations.map((relations) => {
                return [
                    relations[0],
                    getFaceAdjacentPositions(relations[1], size)
                ];
            }));
        }

        this._moves.push(args.face + DIRECTIONS.CW);
    }

    changePositionValues(faceRelations) {
        var self = this;
        var previousValues = self._getFaceAdjacentcyPairValue(faceRelations[3]);

        faceRelations.forEach(function(faceAdjacentcyPair) {
            var theseValues = self._getFaceAdjacentcyPairValue(faceAdjacentcyPair);
            
            faceAdjacentcyPair[1].forEach((value, index) => {
                self._faces[faceAdjacentcyPair[0]][value] = previousValues[index];
            });
            previousValues = theseValues;
        });
    }

    _rotateCounterClockWise(args) {
        var thisFace = this._faces[args.face];
        var size = Math.sqrt(thisFace.length)
        var faceRelations = _.clone(RELATIONS[size][args.face]).reverse();

        if (!args.deep) {
            this._faces[args.face] = rotateFaceCCW(thisFace);

            this.changePositionValues(faceRelations);
        }

        if (args.deep || args.extra) {
            this.changePositionValues(faceRelations.map((relations) => {
                return [
                    relations[0],
                    getFaceAdjacentPositions(relations[1], size)
                ];
            }));
        }

        this._moves.push(args.face + DIRECTIONS.CCW);
    }

    _rotate180(args) {
        this._rotateClockWise(args);
        this._rotateClockWise(args);
    }

    _getFaceAdjacentcyPairValue(faceAdjacentcyPair) {
        var face = faceAdjacentcyPair[0];
        var adjacentSquares = faceAdjacentcyPair[1];

        
        return adjacentSquares.map(e => this._faces[face][e]);
    }

    getMoves() {
        return _.clone(this._moves);
    }

    rotateFace(args) {
        switch(args.direction) {
            case DIRECTIONS.CW:
                this._rotateClockWise(args);
                break;
            case DIRECTIONS.CCW:
                this._rotateCounterClockWise(args);
                break;
            case DIRECTIONS.FLIP:
                this._rotate180(args);
        }
    }
}

export { CubeModel };