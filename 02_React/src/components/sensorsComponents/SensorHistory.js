import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SubTitle from "../helperComponents/SubTitle.js";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 10,
    padding: 10,
    overflow: "auto",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);",
    minWidth: 170,
    minHeight: 105
  }
}));

const SensorHistory = ({ data }) => {
  const [highestTemperature, setHighestTemperature] = useState();
  const [highestHumidity, setHighestHumidity] = useState();
  const [lowestTemperature, setLowestTemperature] = useState();
  const [lowestHumidity, setLowestHumidity] = useState();
  const [avgTemperature, setAvgTemperature] = useState();
  const [avgHumidity, setAvgHumidity] = useState();
  const classes = useStyles();

  useEffect(() => {
    // first effect arrays are empty, second time they are ready
    let ht = data[0].temperature;
    let lt = ht;
    let hh = data[0].humidity;
    let lh = hh;
    let at = 0;
    let ah = 0;

    for (let cData of data) {
      if (cData.temperature > ht) {
        ht = cData.temperature;
      }
      if (cData.humidity > hh) {
        hh = cData.humidity;
      }
      if (cData.temperature < lt) {
        lt = cData.temperature;
      }
      if (cData.humidity < lh) {
        lh = cData.humidity;
      }
      at += parseInt(cData.temperature);
      ah += parseInt(cData.humidity);
    }
    setAvgTemperature((at / data.length).toFixed(1));
    setAvgHumidity((ah / data.length).toFixed(1));
    setHighestTemperature(ht);
    setHighestHumidity(hh);
    setLowestTemperature(lt);
    setLowestHumidity(lh);
  }, [data]);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"latest temperature"} color={"error"} />
            <h1>{data[data.length - 1].temperature}C</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"highest temperature"} color={"error"} />
            <h1>{highestTemperature}C</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"highest humidity"} color={"primary"} />
            <h1>{highestHumidity}%</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"latest humidity"} color={"primary"} />
            <h1>{data[data.length - 1].humidity}%</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"average temperature"} color={"error"} />
            <h1>{avgTemperature}C</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"lowest temperature"} color={"error"} />
            <h1>{lowestTemperature}C</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"lowest humidity"} color={"primary"} />
            <h1>{lowestHumidity}%</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={classes.paper}>
            <SubTitle title={"average humidity"} color={"primary"} />
            <h1>{avgHumidity}%</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SensorHistory;
