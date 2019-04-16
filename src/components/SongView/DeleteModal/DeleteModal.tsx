import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { deleteSong, displaySnackbar } from '../../../actions/actions';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface IDeleteModalProps {
    classes: any,
    songName: string,
    open: boolean,
    handleClose: any,
    _id: string,
    deleteSong: any,
    displaySnackbar: any
};

const styles = {
    link: {
        textDecoration: 'none'
    }
};

const DeleteModal = (props: IDeleteModalProps) => {
    const { classes, songName, open, handleClose, _id, deleteSong, displaySnackbar } = props;

    const handleDelete = () => {
        deleteSong(_id);
        handleClose();
        displaySnackbar("Song successfully deleted");
    }

    return ( 
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete {songName}?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deleting will permanently remove {songName}.
                    It cannot be retrieved once deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Link to="/" className={classes.link}>
                    <Button color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
};
  
export default connect(null, { deleteSong, displaySnackbar })(withStyles(styles)(DeleteModal));
