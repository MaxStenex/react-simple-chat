import { Switch, Route, Redirect } from "react-router-dom";
import { Chat, Join } from "./components";

import "./styles/App.scss";
import "./styles/normalize.scss";

const App = () => {
  return (
    <Switch>
      <Route path="/join" component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/" render={() => <Redirect to="/join" />} />
    </Switch>
  );
};

export default App;
