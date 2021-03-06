import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// Actions
import { addNewSong, editSong, displaySnackbar } from '../../actions/actions';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    input: {
        width: '70vw',
        marginBottom: '1.5em'
    },
    button: {
        width: '70vw',
        marginTop: '1em'
    },
    link: {
        textDecoration: 'none'
    },
    tags: {
        width: '70vw',
        maxWidth: '70vw',
        marginBottom: '1.5em'
    }
};

interface IAddViewState {
    [key: number]: string | string[],
    title: string,
    artist: string,
    album: string,
    tags: string[],
    lyrics: string,
    chords: string
}

interface IAddViewProps {
    classes: any,
    addNewSong: any,
    currentSong: any,
    editSong: any,
    displaySnackbar: any
}

const INPUTS = [
    { name: 'Title', id: 'title', required: true, multiline: false, helperText: "*required" },
    { name: 'Artist', id: 'artist', required: false, multiline: false, helperText: "" },
    { name: 'Album', id: 'album', required: false, multiline: false, helperText: "" },
    { name: 'Tags', id: 'tags', required: false, multiline: false, helperText: "eg: christmas, irish, family" },
    { name: 'Lyrics', id: 'lyrics', required: true, multiline: true, helperText: "*required" },
    { name: 'Lyrics with Chords', id: 'chords', required: false, multiline: true, helperText: "" }
];

const AddView = (props: IAddViewProps) => {
    const { classes, addNewSong, currentSong, editSong, displaySnackbar } = props;

    const x: Record<"root", string> = {root: 'yo'};

    const initialState: IAddViewState = {
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        tags: currentSong.tags,
        lyrics: currentSong.lyrics,
        chords: currentSong.chords
    }

    const [state, setState] = useState(initialState);

    const handleSave = () => {
        if (Object.keys(currentSong).length > 0) {
            editSong(currentSong._id, state);
            displaySnackbar("Song successfully updated");
        } else {
            addNewSong(state);
            displaySnackbar("Song successfully added");
        }
    }

    const handleChange = (e: any) => {
        setState({
            ...state,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

    const handleTagAdd = (chip: string) => {
        var newTagArray = state.tags ? state.tags : [];
        newTagArray.push(chip);
        setState({
            ...state,
            tags: newTagArray
        });
    };
    const handleTagRemove = (chip: string, index: number) => {
        var newTagArray = state.tags.filter(tag => chip !== tag);
        setState({
            ...state,
            tags: newTagArray
        });
    };

    return (
        <Fragment>
            <br />
            <Grid 
                container
                direction="column"
                justify="space-around"
                alignItems="center"
            >
                {
                    INPUTS.map((input: any, index: number) =>
                        <Grid item key={index}>
                            {
                                input.id !== 'tags' ?
                                    <TextField
                                        key={index}
                                        value={state[input.id]}
                                        id={input.id}
                                        required={input.required}
                                        label={input.name}
                                        multiline={input.multiline}
                                        variant="filled"
                                        rows={4}
                                        rowsMax={100}
                                        className={classes.input}
                                        helperText={input.helperText}
                                        onChange={handleChange}
                                    /> :
                                    <ChipInput
                                        key={index}
                                        value={state.tags ? state.tags : []}
                                        onAdd={handleTagAdd}
                                        onDelete={handleTagRemove}
                                        classes={x}
                                        className={classes.tags}
                                        variant="filled"
                                        label={input.name}
                                        id={input.id}
                                        fullWidth={true}
                                        fullWidthInput={true}
                                    />
                            }
                        </Grid>
                    )
                }
                <Grid item>
                    <Link to="/" className={classes.link}>
                        <Button
                            onClick={handleSave}
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                        >
                            Save
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.button}>Cancel</Button>
                    </Link>
                </Grid>
            </Grid>
            <br />
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    currentSong: state.currentSongRequest.currentSong
});
  
export default connect(
    mapStateToProps,
    { addNewSong, editSong, displaySnackbar }
)(withStyles(styles)(AddView));
