import React from 'react';
import { connect }from 'react-redux';

// Actions
import { setFontSize } from '../../../actions/actions'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slider from '@material-ui/lab/Slider';

const styles = {
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }
};

interface ISliderBarProps {
    classes: any,
    fontSize: number,
    setFontSize: any
};

const SliderBar = (props: ISliderBarProps) => {
    const { classes, fontSize, setFontSize } = props;

    const handleSlide = (e: any, value: number) => {
        setFontSize(value);
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Slider min={1} max={100} step={1} value={fontSize} onChange={handleSlide} />
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state: any) => ({
    fontSize: state.lyricViewConfig.fontSize
});
  
export default connect(mapStateToProps, { setFontSize })(withStyles(styles)(SliderBar));
