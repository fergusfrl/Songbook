import { GET_SINGLE_SONG, LOADING_SINGLE_SONG, REMOVE_CURRENT_SONG, SET_CURRENT_SONG } from "../actions/types";

const initialState: any = {
    isLoading: false,
    currentSong: {}
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case LOADING_SINGLE_SONG:
            return {
                ...state,
                isLoading: true
            }
        case GET_SINGLE_SONG:
            return {
                isLoading: false,
                currentSong: action.payload
            }
        case REMOVE_CURRENT_SONG:
            return {
                ...state,
                currentSong: {}
            }
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload
            }
        default:
            return state;
    };
};
