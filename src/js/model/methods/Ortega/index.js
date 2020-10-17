import { isFaceDone } from './face';
import { isOLLDone } from './oll';
import { isPLLDone } from './pll';
import { Ortega, Ortega_Face, Ortega_OLL, Ortega_PLL, Ortega_Face_name, Ortega_OLL_name, Ortega_PLL_name } from '../../../util/methods/index.js';

const id = Ortega;
const cycle = [
    {
        id: Ortega_Face,
        name: Ortega_Face_name,
        check: {
            function: isFaceDone,
            args: ['faces', 'baseFace', 'setBaseFace']
        }
    },
    {
        id: Ortega_OLL,
        name: Ortega_OLL_name,
        check: {
            function: isOLLDone,
            args: ['faces', 'baseFace']
        }
    },
    {
        id: Ortega_PLL,
        name: Ortega_PLL_name,
        check: {
            function: isPLLDone,
            args: ['faces', 'baseFace']
        }
    }
];

const init = function(args) {
    const currentStep = cycle.find(e => e.id === args.step);
    const currentStepIndex = cycle.indexOf(currentStep);
    const extraMoves = [];
    const params = {
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
            if (args.step && args.step === statusArrayItem.id) {
                return args.callback && typeof args.callback === 'function' && args.callback(status);
            }
            if ((statusArray.length - 1) > statusArrayIndex) {
            const nextId = statusArray[statusArrayIndex + 1].id;

            checkStep(cycleArray, statusArray, nextId, faces, isChild);
            } else if (!isChild) {
                return args.callback && typeof args.callback === 'function' && args.callback(status);
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
