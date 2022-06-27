import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './Pages/Search';
import CountryInformation from './Pages/CountryInformation';
import { Stack } from '@mui/material';

function App() {
  return (
    <div data-testid="app">

      <Router>
        <Stack direction="column" justifyContent="center" alignItems="center" my={5}>
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route exact path="/details/:country">
              <CountryInformation />
            </Route>
            <Route  path="*">
              <p>404</p>
            </Route>
          </Switch>
        </Stack>
      </Router>


    </div>
  );
}

export default App;
