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

const styles = {
    card: {
        margin: '1em'
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
        if (artist !== "" && album !== "") return artist + " • " + album;
        if (artist !== "") return artist;
        if (album !== "") return album;
        return "";
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <Link to={`/song/${song.id}`} className={classes.link}>
                    <CardContent>
                        <Typography variant="h6">
                            {title}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {renderSubTitle()}
                        </Typography>
                        {
                            tags && tags.length > 0 && (
                                <>
                                    <br />
                                    <Divider />
                                    <br />
                                    {tags.map((chip: string, index: number) => 
                                        <Chip 
                                            key={index}
                                            className={classes.chip}
                                            label={chip}
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    )}
                                </>
                            ) 
                        }
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    );
};
  
export default withStyles(styles)(SongCard);
