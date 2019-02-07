import React from 'react';
import { connect }from 'react-redux';

// Actions
import { setSearchString } from '../../../actions/actions'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none'
    },
    paper: {
        width: '85vw',
        padding: '0.2em 1em',
        margin: '0.5em auto 1em auto',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    input: {
        marginTop: '0.5em',
        width: '65vw'
    }
};

interface ISearchBarProps {
    classes: any,
    setSearchString: any,
    value: string
};

const SearchBar = (props: ISearchBarProps) => {
    const { classes, value, setSearchString } = props;

    const handleChange = (event: any) => {
        setSearchString(event.currentTarget.value);
    };

    const handleClick = () => {
        if (value.length > 0) {
            setSearchString("");
        };
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Paper className={classes.paper} elevation={8}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <InputBase
                                value={value}
                                placeholder="Search"
                                className={classes.input}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClick}>
                                { value.length > 0 ? <CloseIcon /> : <SearchIcon /> }
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state: any) => ({
    value: state.searchStr
});
  
export default connect(mapStateToProps, { setSearchString })(withStyles(styles)(SearchBar));
