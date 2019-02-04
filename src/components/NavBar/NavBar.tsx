import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

interface navBarProps {
    classes: any,
    pathname: string
};

const styles = {
    header: {
        marginLeft: '.5em'
    },
    link: {
        textDecoration: 'none',
        outline: 'none',
        color: 'white'
    }
};

const NavBar = (props: navBarProps) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { classes, pathname } = props;
    const listView = pathname === '/';

    const renderTitle = () => {
        if (pathname.includes('add')) return "Add New Song";
        if (pathname.includes('edit')) return "Edit Song";
        return "Songbook";
    }

    const handleOpenMenu = (e: any) => setAnchorEl(e.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    return ( 
        !pathname.includes('song') ? (
            <div className={classes.grow}>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar>
                        {listView ?
                            <IconButton color="inherit" onClick={handleOpenMenu}>
                                <MenuIcon />
                            </IconButton>  :
                            <Link to="/" className={classes.link}>
                                <IconButton color="inherit">
                                    <CloseIcon />
                                </IconButton>
                            </Link>
                        }
                        <Typography variant="h5" color="inherit" className={classes.header}>
                            {renderTitle()}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    <Link to="/add" className={classes.link} onClick={handleCloseMenu}>
                        <MenuItem>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>   
                            Add New Song
                        </MenuItem>
                    </Link>
                </Menu>
                <br />
                <br />
                <br />
            </div>
        ) : <></>
    );
};
  
export default withStyles(styles)(NavBar);
