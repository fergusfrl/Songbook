import { GET_ALL_SONGS, LOADING_ALL_SONGS, ADDED_NEW_SONG, DELETE_SONG, EDIT_SONG } from "../actions/types";

const initialState: any = {
    isLoading: false,
    songList: []
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case LOADING_ALL_SONGS:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_SONGS:
            return {
                isLoading: false,
                songList: action.payload
            }
        case ADDED_NEW_SONG:
            return {
                ...state,
                songList: [
                    ...state.songList,
                    { ...action.payload }
                ]
            };
        case DELETE_SONG:
            return {
                ...state,
                songList: state.songList.filter((song: any) => song.id !== action.payload.id)
            }
        case EDIT_SONG:
            return {
                ...state,
                songList: [
                    ...state.songList.filter((song: any) => song.id !== action.payload.id),
                    { ...action.payload }
                ]
            }
        default:
            return state;
    };
};
