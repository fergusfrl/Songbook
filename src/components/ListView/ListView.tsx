import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Actions
import { setSortOrder, removeCurrentSong } from '../../actions/actions'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import DropDownIcon from '@material-ui/icons/ArrowDropDown';

// Components
import SongCard from './SongCard/SongCard';
import SearchBar from './SearchBar/SearchBar';

const styles = {
    counter: {
        marginTop: '13px',
        marginLeft: '1em'
    },
    sort: {
        color: 'grey'
    },
    loader: {
        margin: '2em auto',
        display: 'block'
    }
};

interface IListViewProps {
    classes: any,
    songList: any[],
    setSortOrder: any,
    sortOrder: string,
    searchStr: string,
    isLoading: boolean,
    removeCurrentSong: any
}

const ListView = (props: IListViewProps) => {
    const { classes, songList, sortOrder, setSortOrder, searchStr, isLoading, removeCurrentSong } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        removeCurrentSong();
    });

    const handleMenuOpen = (e: any) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleMenuChoose = (e: any) => {
        setSortOrder(e.currentTarget.getAttribute('value'));
        handleMenuClose();
    };

    const sortAlphabetically = (a: any, b:any) => {
        const regex = /^[Tt][Hh][Ee] /;

        if (a[sortOrder].replace(regex, "") < b[sortOrder].replace(regex, ""))
            return -1;
        if (a[sortOrder].replace(regex, "") > b[sortOrder].replace(regex, ""))
            return 1;
        return 0;
    }

    const filterList = (song: any) => searchStr === "" ||
        song.title.toLowerCase().includes(searchStr) ||
        (song.artist && song.artist.toLowerCase().includes(searchStr)) ||
        (song.album && song.album.toLowerCase().includes(searchStr)) ||
        (song.tags && song.tags.toLowerCase().includes(searchStr));

    return (
        <div>
            {isLoading ? <CircularProgress className={classes.loader} /> : (
                <div>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="subheading" className={classes.counter}>
                                {songList.filter(filterList).length + " of " + songList.length}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading">
                                sort by <span className={classes.sort}>{sortOrder}</span>
                                <IconButton onClick={handleMenuOpen}>
                                    <DropDownIcon />
                                </IconButton>
                            </Typography>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} >
                                <MenuItem
                                    selected={'title' === sortOrder}
                                    value="title"
                                    onClick={handleMenuChoose}
                                >
                                    title
                                </MenuItem>
                                <MenuItem
                                    selected={'artist' === sortOrder}
                                    value="artist"
                                    onClick={handleMenuChoose}
                                >
                                    artist
                                </MenuItem>
                                <MenuItem
                                    selected={'album' === sortOrder}
                                    value="album"
                                    onClick={handleMenuChoose}
                                >
                                    album
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    {songList
                        .filter(filterList)
                        .sort(sortAlphabetically)
                        .map((song: any, index: number) => 
                            <SongCard key={index} song={song} />
                    )}
                    <br />
                    <br />
                    <br />
                    <br />
                    <SearchBar />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    songList: state.songListRequest.songList,
    isLoading: state.songListRequest.isLoading,
    sortOrder: state.sortOrder,
    searchStr: state.searchStr
})
  
export default connect(mapStateToProps, { setSortOrder, removeCurrentSong })(withStyles(styles)(ListView));
