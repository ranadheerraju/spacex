import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from '../appModules/landingpage';
import Notfound from '../appModules/notfound';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/yearwise" component={LandingPage} />
            <Route exact path="/launchwise" component={LandingPage} />
            <Route exact path="/landwise" component={LandingPage} />
            <Route exact path="/all" component={LandingPage} />
            <Route exact path="/*" component={Notfound} />
        </Switch>
    </Router>
)
