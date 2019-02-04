import React, { useState } from 'react';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const styles = {
    margins: {
        margin: '0 2em'
    },
    container: {
        display: 'inline-block',
        margin: '0.1em'
    },
    input: {
        width: '3em'
    },
    word: {
        
    }
};

interface ILyricsInputProps {
    lyrics: string,
    classes: any,
    handleAddChord: any
}

const LyricsInput = (props: ILyricsInputProps) => {
    const { lyrics, classes, handleAddChord } = props;

    const handleInput = (index: number, e: any) => {
        handleAddChord(index, e.currentTarget.value);
    }

    return (
        <div className={classes.margins}>
            {lyrics
                .trim()
                .replace(/\n/g, ' \n ')
                .split(' ')
                .filter((str: string) => str !== "")
                .map((word: string, index: number) => (
                <div key={index} className={classes.container}>
                    <div>
                        <TextField className={classes.input} onChange={(e: any) => handleInput(index, e)} />
                    </div>
                    <div>
                        <Typography variant="body1" className={classes.word}>
                            {word}
                        </Typography>
                    </div>
                </div>
            ))}
            <br />
            <br />
        </div>
    );
};
  
export default withStyles(styles)(LyricsInput);
