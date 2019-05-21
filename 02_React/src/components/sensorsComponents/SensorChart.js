import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SubTitle from "../helperComponents/SubTitle.js";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 10,
    padding: 10,
    overflow: "auto",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);",
    minWidth: 170
  }
}));

const SensorChart = ({ data }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <SubTitle title={"AM2320"} color={"primary.secondary"} />
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart
          data={data}
          margin={{ top: 15, right: 30, bottom: 15, left: 0 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Line
            strokeWidth={2}
            type="monotone"
            dot={false}
            dataKey="temperature"
            stroke="rgb(244, 67, 54)"
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dot={false}
            dataKey="humidity"
            stroke="rgb(33, 150, 243)"
          />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SensorChart;
