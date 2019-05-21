import axios from 'axios'
import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SensorHistory from './sensorsComponents/SensorHistory'
import SensorChart from './sensorsComponents/SensorChart'
import SensorTable from './sensorsComponents/SensorTable'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    textAlign: 'center',
  },
  table: {
    minWidth: 650,
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
  },
  subTitle: {
    fontSize: 16,
  },
  paper: {
    margin: 10,
    padding: 10,
    overflow: 'auto',
    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);',
    minWidth: 170
  },
}));

const Sensors = () => {
  const [data, setData] = useState([{}]);
  const [data24h, setdata24h] = useState([{}])
  const [dataTable, setDataTable] = useState([{}])
  const classes = useStyles();
  
  useEffect(() => {
    axios
      .get('http://x.x.x.x:3001/sensors')
      .then(response => {
        setData(response.data)
        let day = response.data.slice(-288)
        setdata24h(day)
        let table = response.data.slice(-10).reverse()
        setDataTable(table)
      })
  }, [])

  return (
  <Container maxWidth="lg" className={classes.root}>
    <Typography className={classes.title} component="h1" variant="button" color="secondary.main" gutterBottom>
      24h
    </Typography>
      <Grid direction="row-reverse" container justify="space-evenly" alignItems="center">
        <Grid item xs={12} md={12} lg={12}>
          <SensorChart data={data24h}/>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SensorHistory data={data24h}/>
        </Grid>
      </Grid>
    <br></br>
    <Typography className={classes.title} component="h1" variant="button" color="secondary.main" gutterBottom>
      All-time
    </Typography>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <SensorChart data={data}/>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SensorHistory data={data}/>
        </Grid>
      </Grid>
    <br></br>
    <Typography className={classes.title} component="h1" variant="button" color="secondary.main" gutterBottom>
      API      
    </Typography>
      <SensorTable data={dataTable}/>
    </Container>
    )
}

export default Sensors