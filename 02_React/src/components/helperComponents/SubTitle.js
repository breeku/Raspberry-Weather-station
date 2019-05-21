import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  subTitle: {
    fontSize: 16
  }
}));

const SubTitle = ({ title, color }) => {
    const classes = useStyles();
    return (
        <Typography
        variant="button"
        className={classes.subTitle}
        color={color}
        gutterBottom
        >
        {title}
        </Typography>
    );
};

export default SubTitle