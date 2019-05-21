import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    textAlign: 'center',
  }
}));

const Raspberry = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <h1>Raspberry</h1>
      </div>
    )
  }

export default Raspberry