import axios from 'axios';
import { 
    GET_ALL_SONGS, 
    GET_SINGLE_SONG, 
    SET_SORT_ORDER, 
    SET_SEARCH_STRING, 
    LOADING_ALL_SONGS, 
    SET_VIEW,
    CREATING_SONG,
    ADDED_NEW_SONG,
    LOADING_SINGLE_SONG,
    SET_FONT_SIZE,
    SET_CHORD_VIEW,
    DELETE_SONG,
    REMOVE_CURRENT_SONG,
    EDIT_SONG,
    DISPLAY_SNACKBAR,
    CLOSE_SNACKBAR,
    SET_CURRENT_SONG
} from './types';

const server: any = process.env.REACT_APP_SERVER_LOCATION;

export const getAllSongs = () => (dispatch: any) => {
    dispatch({ type: LOADING_ALL_SONGS });
    makeRequest(
        { url: server, method: 'get', data: {} },
        GET_ALL_SONGS,
        dispatch
    );
};

export const addNewSong = (song: any) => (dispatch: any) => {
    dispatch({ type: CREATING_SONG });
    makeRequest(
        { url: server, method: 'post', data: {
            ...song,
            hasChords: calculateHasChords(song.chords)
        } },
        ADDED_NEW_SONG,
        dispatch
    );
}

export const setSortOrder = (sortOrder: string) => (dispatch: any) => {
    dispatch({
        type: SET_SORT_ORDER,
        payload: sortOrder
    });
};

export const setSearchString = (searchString: string) => (dispatch: any) => {
    dispatch({
        type: SET_SEARCH_STRING,
        payload: searchString.toLowerCase()
    });
};

export const setView = (view: string) => (dispatch: any) => {
    dispatch({
        type: SET_VIEW,
        payload: view
    })
}

export const getSingleSong = (id: string) => (dispatch: any) => {
    dispatch({ type: LOADING_SINGLE_SONG })
    makeRequest(
        { url: `${server}/${id}`, method: 'get', data: {} },
        GET_SINGLE_SONG,
        dispatch
    );
    // axios({
    //     url: server,
    //     method: 'post',
    //     data: {
    //         ...getSingleSongQuery,
    //         variables: { id: id }
    //     }
    // }).then(res => {
    //     dispatch({
    //         type: GET_SINGLE_SONG,
    //         payload: res.data.data.song
    //     });
    // }).catch(err => {
    //     console.log(err);
    // });
};

export const removeCurrentSong = () => (dispatch: any) => {
    dispatch({ type: REMOVE_CURRENT_SONG })
}

export const setFontSize = (value: number) => (dispatch: any) => {
    dispatch({
        type: SET_FONT_SIZE,
        payload: value
    });
};

export const setChordView = (on: boolean) => (dispatch: any) => {
    dispatch({
        type: SET_CHORD_VIEW,
        payload: on
    });
};

export const displaySnackbar = (message: string) => (dispatch: any) => {
    dispatch({
        type: DISPLAY_SNACKBAR,
        payload: message
    });
};

export const closeSnackbar = () => (dispatch: any) => {
    dispatch({ type: CLOSE_SNACKBAR });
};

export const setCurrentSong = (song: any) => 
    (dispatch: any) => {
        dispatch({
            type: SET_CURRENT_SONG,
            payload: song
        });
    }

export const deleteSong = (id: string) => (dispatch: any) => {
    makeRequest(
        { url: `${server}/${id}`, method: 'delete', data: {} },
        DELETE_SONG,
        dispatch
    );
    // axios({
    //     url: server,
    //     method: 'post',
    //     data: {
    //         ...deleteSongMutation,
    //         variables: {
    //             id: id
    //         }
    //     }
    // }).then(res => {
    //     dispatch({
    //         type: DELETE_SONG,
    //         payload: res.data.data.deleteSong
    //     });
    // }).catch(err => {
    //     console.log(err);
    // });
};

export const editSong = (id: string, song: any) => (dispatch: any) => {
    makeRequest(
        { url: `${server}/${id}`, method: 'put', data: {
            ...song,
            hasChords: calculateHasChords(song.chords)
        } },
        EDIT_SONG,
        dispatch
    );
    // axios({
    //     url: server,
    //     method: 'post',
    //     data: {
    //         ...editSongMutation,
    //         variables: {
    //             id: id,
    //             input: {
    //                 title: song.title,
    //                 artist: song.artist,
    //                 album: song.album,
    //                 tags: song.tags,
    //                 lyrics: song.lyrics,
    //                 chords: song.chords,
    //                 hasChords: calculateHasChords(song.chords)
    //             }
    //         }
    //     }
    // }).then(res => {
    //     dispatch({
    //         type: EDIT_SONG,
    //         payload: res.data.data.editSong
    //     });
    // }).catch(err => {
    //     console.log(err);
    // });
}

const calculateHasChords = (chords: any) => {
    if (chords === null) return false;
    if (chords === undefined) return false;
    if (chords === "") return false;
    return true;
}

const makeRequest = (config: any, type: string, dispatch: any) => {
    axios({
        url: config.url,
        method: config.method,
        data: config.data
    })
    .then(res => {
        dispatch({
            type: type,
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
    });
}
