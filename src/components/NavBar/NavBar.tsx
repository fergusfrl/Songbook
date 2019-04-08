import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';

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
    const [drawer, setDrawer] = useState(false);
    const { classes, pathname } = props;
    const listView = pathname === '/';

    const renderTitle = () => {
        if (pathname.includes('add')) return "Add New Song";
        if (pathname.includes('edit')) return "Edit Song";
        return "Songbook";
    }

    const toggleDrawer = () => setDrawer(!drawer);

    return ( 
        !pathname.includes('song') ? (
            <div className={classes.grow}>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar>
                        {listView ?
                            <IconButton color="inherit" onClick={toggleDrawer}>
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
                <Drawer open={drawer} onClose={toggleDrawer}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <img src={process.env.PUBLIC_URL + '/img/icon-72x72.png'} width="35" height="35" />
                            </ListItemIcon>
                            <ListItemText primary="Songbook" secondary="v1.0.0" />
                        </ListItem>
                        <Divider />
                        <Link to="/add" className={classes.link} onClick={toggleDrawer}>
                            <ListItem button>
                                <ListItemIcon><AddIcon /></ListItemIcon>
                                <ListItemText primary="Add New Song" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <br />
                <br />
                <br />
            </div>
        ) : <></>
    );
};
  
export default withStyles(styles)(NavBar);
