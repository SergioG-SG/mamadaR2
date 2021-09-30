import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AboutWeb } from "./componentes/Paginas/About";
import { ListadoReports } from "./componentes/Paginas/ListadoReports";
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={ListadoReports} />
            <Route path="/ListadoReports" exact component={ListadoReports} />
            <Route path="/About" exact component={AboutWeb} />
          </Switch>
        </div>
      </Router>
    );
  }
}

/*
<Route exact path="/">
    <Redirect to="/home" />
</Route>
*/
export default App;