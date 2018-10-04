import * as actionTypes from '../actions'

const intialState = {
    results: []
};

const reducer = (state = intialState, action) => {

    switch (action.type) {

        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})

            };
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1);
            // filter returns a new array and executes a method on each element
            const updatedArray = state.results.filter((result) => {
                return result.id !== action.resultElId
            });
            return {
                ...state,
                results: updatedArray
            };
        default:
            return state
    }

};

export default reducer