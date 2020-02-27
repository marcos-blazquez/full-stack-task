import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./components/Table";

import "./App.css";
const useStyles = makeStyles({
  titleContainer: {
    height: "200px"
  },
  text: {
    textAlign: "left"
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="xl">
          <div className={classes.titleContainer}>
            <h1 className={classes.text}>{"HN Feed"}</h1>
            <h3 className={classes.text}>{"We <3 hacker news!"}</h3>
          </div>
          <Table />
        </Container>
      </header>
    </div>
  );
}

export default App;
