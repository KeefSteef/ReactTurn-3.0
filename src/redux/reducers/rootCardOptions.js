import {
    ADD_TO_STATICS,
    REDRAW_STATE_ELEMENT,
    UPDATE_AFTER_REMOVE,
    PUSH_OBJ_AFTER_REMOVE,
    LAST_FINISHED_CARD,
    PAUSE_CARD, SHOW_REJECTED_LIST, NEW_CARD_TIME_TO_START
} from "../actionsType/actionsType";
import {clearArr} from "../clearArr";
import {cleanObjectDuplicatesById} from "../../Services/DuplicatesCleaner/cleanObjectDuplicatesById";


const spreadDefaultStateValues = (state) => {
    return {
        statics: state.statics,
        limitStatics : state.limitStatics,
        isAddToState: state.isAddToState,
        lastCard: state.lastCard,
        doPauseCard: state.doPauseCard,
        viewRejectedList: state.viewRejectedList,
    }
}



const initialState = {
    statics: [],
    limitStatics : [],
    isAddToState: false,
    lastCard: null,
    doPauseCard: false,
    viewRejectedList: false,
}


let arr = [];
export default function rootCardOptions(state = initialState, action){
    switch (action.type){
        case ADD_TO_STATICS:
            arr.push(action.payload);
            arr = cleanObjectDuplicatesById(arr)
            return {
                statics: [...arr],
                limitStatics: clearArr(arr),
                doPauseCard: state.doPauseCard
            }

        case REDRAW_STATE_ELEMENT :
            let array = [...arr];
            array[action.payload.id - 1] = action.payload
            return {
                statics: [...array],
                limitStatics: clearArr(arr),
                doPauseCard: state.doPauseCard

            }


        case UPDATE_AFTER_REMOVE :
            let prevArr = [...arr];
            let newArr = prevArr.filter(el => el.id !== action.payload.id);
            arr = newArr

            return {
                statics: [...arr],
                limitStatics: clearArr(arr),
                doPauseCard: state.doPauseCard

            }

        case PUSH_OBJ_AFTER_REMOVE:
            return {
                ...spreadDefaultStateValues(state),
                isAddToState: action.payload,

            }

        case LAST_FINISHED_CARD:
                return {
                    ...spreadDefaultStateValues(state),
                    lastCard: action.payload,
                }


        case SHOW_REJECTED_LIST:
            return {
                ...spreadDefaultStateValues(state),
                viewRejectedList: action.payload
            }

        case PAUSE_CARD :
            return {
                ...spreadDefaultStateValues(state),
                doPauseCard: action.payload,
                viewRejectedList: action.payload
            }

        default : return {
            ...state
        }
    }
}







