import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

// Icons
import MusicIcon from '@material-ui/icons/MusicNote';

const styles = {
    card: {
        margin: '0.5em 1em'
    },
    chip: {
        margin: '0 .3em'
    },
    link: {
        textDecoration: 'none'
    }
};

interface Song {
    id: String,
    title: string,
    artist: string,
    album: string,
    tags: string[]
};

interface ISongCardProps {
    classes: any,
    song: Song
};

const SongCard = (props: ISongCardProps) => {
    const { classes, song } = props;
    const { title, artist, album, tags } = song;

    const renderSubTitle = () => {
        if (artist && artist !== "" && album && album !== "") return artist + " • " + album;
        if (artist && artist !== "") return artist;
        if (album && album !== "") return album;
        return "";
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <Link to={`/song/${song.id}`} className={classes.link}>
                    <CardHeader
                        title={<Typography variant="h6">{title}</Typography>}
                        subheader={renderSubTitle()}
                        // If has chords
                        // action={
                        //     <IconButton color="secondary">
                        //         <MusicIcon />
                        //     </IconButton>
                        // }
                    />
                        {
                            tags && tags.length > 0 && (
                                <>
                                    <Divider />
                                    <CardContent>
                                        {tags.map((chip: string, index: number) => 
                                            <Chip 
                                                key={index}
                                                className={classes.chip}
                                                label={chip}
                                                variant="outlined"
                                                color="secondary"
                                            />
                                        )}
                                    </CardContent>
                                </>
                            ) 
                        }
                </Link>
            </CardActionArea>
        </Card>
    );
};
  
export default withStyles(styles)(SongCard);
