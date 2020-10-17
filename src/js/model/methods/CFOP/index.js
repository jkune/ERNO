import { isCrossDone } from './cross';
import { isF2LDone, isF2LPairDone } from './f2l';
import { isOLLDone } from './oll';
import { isPLLDone } from './pll';
import { CFOP, OLL, PLL, F2L, CROSS, F2L_PAIR_1, F2L_PAIR_2, F2L_PAIR_3, F2L_PAIR_4 } from '../../../util/methods/index.js';

const id = CFOP;
const cycle = [
    {
        id: CROSS,
        name: 'Cross',
        check: {
            function: isCrossDone,
            args: ['faces', 'size', 'baseFace', 'setBaseFace']
        }
    },
    {
        id: F2L,
        name: 'F2L',
        children: [
            {
                id: F2L_PAIR_1,
                check: {
                    function: isF2LPairDone,
                    args: ['faces', 'size', 'baseFace']
                }
            },
            {
                id: F2L_PAIR_2,
                check: {
                    function: isF2LPairDone,
                    args: ['faces', 'size', 'baseFace']
                }
            },
            {
                id: F2L_PAIR_3,
                check: {
                    function: isF2LPairDone,
                    args: ['faces', 'size', 'baseFace']
                }
            },
            {
                id: F2L_PAIR_4,
                check: {
                    function: isF2LPairDone,
                    args: ['faces', 'size', 'baseFace']
                }
            }
        ],
        check: {
            function: isF2LDone,
            args: ['faces', 'size', 'baseFace']
        }
    },
    {
        id: OLL,
        name: 'OLL',
        check: {
            function: isOLLDone,
            args: ['faces', 'baseFace']
        }
    },
    {
        id: PLL,
        name: 'PLL',
        check: {
            function: isPLLDone,
            args: ['faces', 'size', 'baseFace']
        }
    }
];

const init = function (args) {
    const currentStep = cycle.find(e => e.id === args.step);
    const currentStepIndex = cycle.indexOf(currentStep);
    const extraMoves = [];
    const params = {
        size: args.size,
        baseFace: args.baseFace || null,
        setBaseFace: (face) => {
            params.baseFace = face;
        }
    };
    const status = cycle.map((step) => {
        return {
            id: step.id,
            name: step.name,
            moves: [],
            finished: false,
            children: (step.children || []).map((ch) => {
                return {
                    id: ch.id,
                    moves: [],
                    finished: false,
                }
            }),
        }
    }).filter((e, index) => {
        return !currentStep || index <= currentStepIndex;
    });

    checkStep(cycle, status, status[0].id, args.faces);

    /**
     * Returns TRUE if all previous moves in the root were finished. FALSE otherwise
     * @param { String } id 
     * @param { Array } faces 
     */
    function checkFinishedPreviousSteps(id, faces) {
        const cycleArrayItem = cycle.find(e => e.id === id);
        const cycleArrayIndex = cycle.indexOf(cycleArrayItem);

        return cycle.slice(0, cycleArrayIndex).every((e) => {
            const args = getStepArgs(e, faces);

            return e.check.function(args);
        });
    }

    /**
     * Returns all the args needed for the current step
     * @param { Object } step 
     * @param { Array } faces 
     */
    function getStepArgs(step, faces) {
        return Object.assign({}, Object.keys(params).reduce((total, key) => {
            if (step.check.args.includes(key))
                total[key] = params[key];

            return total;
        }, {}), { faces: faces, id: step.id });
    }

    /**
     * Checks if the step is finished
     * @param { Array } cycleArray 
     * @param { Array } statusArray 
     * @param { String } id 
     * @param { Array } faces 
     */
    function checkStep(cycleArray, statusArray, id, faces, isChild) {
        const statusArrayItem = statusArray.find(e => e.id === id);
        const statusArrayIndex = statusArray.indexOf(statusArrayItem);
        const cycleArrayItem = cycleArray.find(e => e.id === id);
        const cycleArrayIndex = cycleArray.indexOf(cycleArrayItem);

        if (statusArrayItem.children && statusArrayItem.children.length >= 1) {
            const childrenStep = statusArrayItem.children.find(ch => !ch.finished);
            const childrenCycleArray = cycle.find(e => e.id === id).children;

            if (checkFinishedPreviousSteps(id, faces)) {
                checkStep(childrenCycleArray, statusArrayItem.children, childrenStep.id, faces, true);
            }
        }

        statusArrayItem.finished = cycleArray.slice(0, cycleArrayIndex + 1).every((e) => {
            const args = getStepArgs(e, faces);

            return e.check.function(args);
        });

        if (statusArrayItem.finished) {
            args.callback && typeof args.callback === 'function' && args.callback(status);

            if ((statusArray.length - 1) > statusArrayIndex) {
                const nextId = statusArray[statusArrayIndex + 1].id;

                checkStep(cycleArray, statusArray, nextId, faces, isChild);
            }
        }
    }

    return {
        getBaseFace: () => {
            return params.baseFace;
        },
        getStatus: () => {
            return status;
        },
        onMove: (move, faces) => {
            const step = status.find(step => !step.finished);

            if (!step) {
                extraMoves.push(move);
                return;
            }

            if (step.children && step.children.length >= 1) {
                const childrenStep = step.children.find(ch => !ch.finished);

                childrenStep.moves.push(move);
            }

            step.moves.push(move);
            checkStep(cycle, status, step.id, faces);
        }
    }
}

export default {
    id,
    init
};
