import { SET_SEARCH_STRING } from "../actions/types";

const initialState: string = "";

export default function(state = initialState, action: any) {
    switch (action.type) {
        case SET_SEARCH_STRING:
            return action.payload
        default:
            return state;
    };
};
