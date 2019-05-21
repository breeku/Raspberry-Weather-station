import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./css/main.css";

import Sensors from "./components/Sensors";
import Raspberry from "./components/Raspberry";

const useStyles = makeStyles({
  nav: {
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
  }
});

const AppRouter = () => {
  const [tabValue, setTabValue] = useState(1);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Router>
        <Route
          render={({ location }) => (
            <div>
              <Route exact path="/" render={() => <Redirect to="/sensors" />} />
              <Paper square className={classes.nav} elevation={3}>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  centered
                >
                  <Tab component={Link} disabled to="/" label="Dashboard" />
                  <Tab component={Link} to="/sensors" label="Sensors" />
                  <Tab component={Link} to="/raspberry" label="Raspberry" />
                </Tabs>
              </Paper>

              <TransitionGroup className="transition-group">
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={{ enter: 300, exit: 300 }}
                >
                  <section className="route-section">
                    <Switch location={location}>
                      <Route path="/sensors" component={Sensors} />
                      <Route path="/raspberry" component={Raspberry} />
                      <Route render={() => <div>Not Found..</div>} />
                    </Switch>
                  </section>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
        />
      </Router>
    </div>
  );
};

export default AppRouter;
