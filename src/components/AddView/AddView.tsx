import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { addNewSong, editSong } from '../../actions/actions';

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
    }
};

interface IAddViewState {
    [key: number]: string,
    title: string,
    artist: string,
    album: string,
    tags: string,
    lyrics: string,
    chords: string
}

interface IAddViewProps {
    classes: any,
    addNewSong: any,
    currentSong: any,
    editSong: any
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
    const { classes, addNewSong, currentSong, editSong } = props;

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
        Object.keys(currentSong).length > 0 ? 
            editSong(currentSong.id, state) :
            addNewSong(state);
    }

    const handleChange = (e: any) => {
        setState({
            ...state,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

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
                    INPUTS.map((input: any) => 
                        <Grid item>
                            <TextField
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
                            />
                        </Grid>
                    )
                }
                <Grid item>
                    <Link to="/" className={classes.link}>
                        <Button onClick={handleSave} className={classes.button} variant="contained" color="secondary">
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
  
export default connect(mapStateToProps, { addNewSong, editSong })(withStyles(styles)(AddView));
