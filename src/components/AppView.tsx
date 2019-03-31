import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';

// Actions
import { getAllSongs, closeSnackbar } from '../actions/actions';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Components
import NavBar from './NavBar/NavBar';
import ListView from './ListView/ListView';
import SongView from './SongView/SongView';
import AddView from './AddView/AddView';

interface IAppViewProps extends RouteComponentProps<any> {
    location: any,
    getAllSongs: any,
    songList: any[],
    previousView: any,
    closeSnackbar: any,
    snackbar: any
}

class AppView extends Component<IAppViewProps> {
    state = {
        previousView: null
    }

    componentWillReceiveProps(nextProps: any) {
        this.state.previousView = this.props.location;
    }

    componentWillMount() {
        this.props.getAllSongs();
    }

    render() {
        const { location, closeSnackbar } = this.props;
        const { open, message } = this.props.snackbar;
        const modal = location.state && location.state.to === 'modal';

        return (
            <Fragment>
                <NavBar pathname={location.pathname} />
                <div className="view-container">
                    <Switch location={modal ? this.state.previousView : location}>
                        <Route exact path='/' component={ListView} />
                        <Route path='/add' component={AddView} />
                        <Route path='/edit/:id' component={AddView} />
                    </Switch>
                </div>
                <div className="modal-container">
                    <Switch location={location}>
                        <Route path='/song/:id' component={SongView} />
                    </Switch>
                </div>
                <Snackbar
                    open={open}
                    onClose={closeSnackbar}
                    message={message}
                    autoHideDuration={4000}
                    action={[
                        <IconButton color="inherit" onClick={closeSnackbar}>
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </Fragment>
        );
    }
};

const mapStateToProps = (state: any) => ({
    songList: state.songList,
    snackbar: state.snackbar
})
  
export default withRouter(
    connect(mapStateToProps, { getAllSongs, closeSnackbar })(AppView) as any
);
