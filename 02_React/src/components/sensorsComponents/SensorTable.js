import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  paper: {
    margin: 10,
    padding: 10,
    overflow: "auto",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);",
    minWidth: 170
  }
}));

const SensorTable = ({ data }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Humidity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SensorTable;
