import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';

// Actions
import { getAllSongs } from '../actions/actions';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Components
import NavBar from './NavBar/NavBar';
import ListView from './ListView/ListView';
import SongView from './SongView/SongView';
import AddView from './AddView/AddView';
import EditView from './EditView/EditView';

const styles = {
};

interface IAppViewProps extends RouteComponentProps<any> {
    location: any,
    getAllSongs: any,
    songList: any[],
    previousView: any
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
        const { location } = this.props;
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
            </Fragment>
        );
    }
};

const mapStateToProps = (state: any) => ({
    songList: state.songList
})
  
export default withRouter(
    connect(mapStateToProps, { getAllSongs })(AppView) as any
);
