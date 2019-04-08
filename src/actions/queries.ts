export const getAllSongsQuery = {
    query: `
        query getAllSongs {
            songs {
                id
                title
                artist
                album
                tags
                hasChords
            }
        }
    `
};

export const getSingleSongQuery = {
    query: `
        query getSingleSong($id: ID!) {
            song(id: $id) {
                lyrics
                chords
            }
        }
    `
};

export const addSongMutation = {
    query: `
        mutation addNewSong($input: SongInput!) {
            addNewSong(input: $input) {
                id
                title
                artist
                album
                tags
                hasChords
            }
        }
    `
};

export const deleteSongMutation = {
    query: `
        mutation deleteSong($id: ID!) {
            deleteSong(id: $id) {
                id
                title
            }
        }
    `
};

export const editSongMutation = {
    query: `
        mutation editSong($id: ID!, $input: SongInput) {
            editSong(id: $id, input: $input) {
                id
                title
                artist
                album
                tags
                hasChords
            }
        }
    `
};
