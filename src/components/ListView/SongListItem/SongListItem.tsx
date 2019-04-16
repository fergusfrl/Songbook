import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import MusicIcon from '@material-ui/icons/MusicNote';

const styles = {
    link: {
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.54)'
    }
};

interface Song {
    _id: String,
    title: string,
    artist: string,
    album: string,
    tags: string[],
    lyrics: string,
    chords: string,
    hasChords: boolean
};

interface ISongListItemProps {
    classes: any,
    song: Song,
    setCurrentSong: any
};

const SongListItem = (props: ISongListItemProps) => {
    const { classes, song, setCurrentSong } = props;
    const { _id, title, artist, album, tags, hasChords, lyrics, chords } = song;

    const renderSubTitle = () => {
        if (artist && artist !== "" && album && album !== "") return artist + " • " + album;
        if (artist && artist !== "") return artist;
        if (album && album !== "") return album;
        return "";
    }

    const handleSongClick = () => setCurrentSong(song);

    return (
        <Fragment>
            <Divider />
            <Link to={`/song/${song._id}`} className={classes.link}>
                <ListItem button onClick={handleSongClick}>
                    <ListItemText primary={title} secondary={renderSubTitle()} />
                    {hasChords && (                
                        <ListItemIcon>
                            <MusicIcon color="secondary" />
                        </ListItemIcon>
                    )}
                </ListItem>
            </Link>
        </Fragment>
    );
};
  
export default withStyles(styles)(SongListItem);
