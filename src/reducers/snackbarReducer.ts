import { DISPLAY_SNACKBAR, CLOSE_SNACKBAR } from "../actions/types";

const initialState: any = {
    message: "",
    open: false
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case DISPLAY_SNACKBAR:
            return {
                message: action.payload,
                open: true
            };
        case CLOSE_SNACKBAR:
            return initialState;
        default:
            return state;
    };
};
