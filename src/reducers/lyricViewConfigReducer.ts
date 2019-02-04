import { SET_FONT_SIZE, SET_CHORD_VIEW } from "../actions/types";

const initialState: any = {
    fontSize: 14,
    visibleChords: false
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case SET_FONT_SIZE:
            return {
                ...state,
                fontSize: action.payload
            };
        case SET_CHORD_VIEW:
            return {
                ...state,
                visibleChords: action.payload
            }
        default:
            return state;
    };
};
