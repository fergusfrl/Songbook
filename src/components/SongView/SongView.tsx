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
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LyricsIcon from '@material-ui/icons/Notes';
import ChordsIcon from '@material-ui/icons/QueueMusic';

// Components
import SliderBar from './SliderBar/SliderBar';
import DeleteModal from './DeleteModal/DeleteModal'

const styles = {
    loader: {
        margin: '2em auto',
        display: 'block'
    },
    cardHeader: {
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0.2em 1em'
    },
    tag: {
        margin: '0 .5em'
    },
    card: {
        display: 'block',
        minHeight: '100vh',
        width: '100vw'
    },
    link: {
        textDecoration: 'none',
        outline: 'none',
        color: 'white'
    },
    icon: {
        marginTop: '0.4em'
    },
    content: {
        margin: '1.5em'
    }
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
    const { id, title, artist, album, tags, lyrics, chords } = currentSong;

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

    const renderContent = () => (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title={<Typography align="center" variant="h5">{title}</Typography>}
                    subheader={<Typography align="center" variant="subtitle2">{renderSubTitle()}</Typography>}
                    avatar={
                        <Link to="/" className={classes.link}>
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                    }
                    action={
                        <IconButton className={classes.icon} onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <div className={classes.chips}>
                    {tags && tags.length > 0 && tags.map((tag: string, index: number) => 
                        <Chip
                            key={index}
                            label={tag}
                            variant="outlined"
                            color="secondary"
                            className={classes.tag}
                        />
                    )}
                </div>
                <Tabs
                    value={tab}
                    variant="fullWidth"
                    onChange={handleTab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Lyrics" icon={<LyricsIcon />} />
                    <Tab label="Chords" icon={<ChordsIcon />} />
                </Tabs>
                <Divider />
                <CardContent className={classes.content}>
                    <SwipeableViews index={tab} onChangeIndex={handleSwipe}>
                        <Typography variant="body1" align="center" style={{ fontSize, whiteSpace: 'pre-line' }}>
                            { lyrics }
                        </Typography>
                        <Typography variant="body1" align="center" style={{ fontSize, whiteSpace: 'pre-line' }}>
                            { chords }
                        </Typography>
                    </SwipeableViews>
                    <br />
                    <br />
                    <br />
                </CardContent>
            </Card>
            <SliderBar />
            <DeleteModal songName={title} id={id} open={modal} handleClose={handleModalClose} />
        </div>
    )

    return (
        <Fragment>
            { isLoading ? <CircularProgress className={classes.loader} /> : renderContent() }
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
