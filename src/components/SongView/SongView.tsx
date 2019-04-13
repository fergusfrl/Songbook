import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

// Actions
import { getSingleSong, setChordView } from '../../actions/actions';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Components
import SliderBar from './SliderBar/SliderBar';
import DeleteModal from './DeleteModal/DeleteModal'

const styles = {
    loader: {
        margin: '2em auto',
        display: 'block'
    },
    link: {
        textDecoration: 'none',
        outline: 'none',
        color: 'white'
    },
    content: {
        margin: '1.5em'
    },
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
};

interface ISongViewProps {
    location: any,
    getSingleSong: any,
    isLoading: boolean,
    currentSong: any,
    classes: any,
    fontSize: number,
    chordView: boolean,
    setChordView: any
}

const SongView = (props: ISongViewProps) => {
    const { location, getSingleSong, isLoading, currentSong, classes, fontSize } = props;
    const { id, title, artist, album, tags, lyrics, chords, hasChords } = currentSong;

    const [anchorEl, setAnchorEl] = useState(null);
    const [modal, setModal] = useState(false);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        getSingleSong(location.pathname.substring(6))
    }, []);

    const renderSubTitle = () => {
        if (artist && artist !== "" && album && album !== "") return artist + " • " + album;
        if (artist && artist !== "") return artist;
        if (album && album !== "") return album;
        return "";
    }

    const handleTab = (e: any, tab: number) => setTab(tab);
    const handleSwipe = (tab: number) => setTab(tab);
    const handleMenuOpen = (e: any) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleModalOpen = () => setModal(true);
    const handleModalClose = () => setModal(false);
    const handleDeleteClick = () => {
        handleMenuClose();
        handleModalOpen();
    }

    const renderTypography = (content: string) => (
        <Typography variant="body1" align="center" style={{ fontSize, whiteSpace: 'pre-line' }}>
            { content }
        </Typography>
    );

    const renderContent = () => hasChords ?
        <SwipeableViews index={tab} onChangeIndex={handleSwipe}>
            { renderTypography(lyrics) }
            { renderTypography(chords) }
        </SwipeableViews> :
        renderTypography(lyrics);

    return (
        <Fragment>
            <div className={classes.root}>
                <AppBar position="sticky" style={{ backgroundColor: '#fff' }}>
                    <Toolbar>
                        <Link to="/" className={classes.link}>
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <div style={{ margin: '1em 0.5em 0.5em 0.5em' }} className={classes.grow}>
                            <Grid  
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item style={{ padding: '0.2em 0' }}>
                                    <Typography align="center" variant="title">{title}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="center" variant="subheading" color="textSecondary">{renderSubTitle()}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <IconButton className={classes.icon} onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                    </Toolbar>
                    {
                        hasChords &&
                            <Tabs
                                value={tab}
                                variant="fullWidth"
                                onChange={handleTab}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Lyrics"  />
                                <Tab label="Chords"  />
                            </Tabs>
                    }
                </AppBar>
                    <div className={classes.content}>
                    {/* { isLoading ? <CircularProgress className={classes.loader} /> : renderContent() } */}
                    { renderContent() }
                    <br />
                    <br />
                    <br />
                </div>
                <SliderBar />
                <DeleteModal songName={title} id={id} open={modal} handleClose={handleModalClose} />
            </div>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <Link to={`/edit/${currentSong.id}`} className={classes.link}>
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>    
                        Edit Song
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>  
                    Delete Song
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    isLoading: state.currentSongRequest.isLoading,
    currentSong: state.currentSongRequest.currentSong,
    fontSize: state.lyricViewConfig.fontSize,
    chordView: state.lyricViewConfig.visibleChords
});
  
export default connect(mapStateToProps, { getSingleSong, setChordView })(withStyles(styles)(SongView));
