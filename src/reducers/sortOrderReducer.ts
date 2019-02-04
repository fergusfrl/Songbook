import { SET_SORT_ORDER } from "../actions/types";

const initialState: string = "title";

export default function(state = initialState, action: any) {
    switch (action.type) {
        case SET_SORT_ORDER:
            return action.payload
        default:
            return state;
    };
};
