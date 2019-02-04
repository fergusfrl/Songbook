import { SET_VIEW } from "../actions/types";

const initialState: string = "list";

export default function(state = initialState, action: any) {
    switch (action.type) {
        case SET_VIEW:
            return action.payload
        default:
            return state;
    };
};
