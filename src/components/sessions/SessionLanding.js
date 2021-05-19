import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom'

import JoinSession from './JoinSession'
import StartSession from './StartSession'

function SessionLanding() {
  return (
    <div className="bg-purple-900 rounded-xl p-16 w-1/2">
      <Router>
        <Switch>
          <Route path="/host">
            <StartSession />
          </Route>
          <Route path="/join">
            <JoinSession />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome to the Cable Club!</h1>
      <div className="flex items-center justify-center space-x-20 mt-20 w-10/12">
        <Link
          className="bg-gameboy-green-lightest px-4 py-2 text-xl font-display text-gameboy-green-darkest rounded hover:bg-gameboy-green-light"
          to="/host">
          Start session
        </Link>
        <Link
          className="bg-gameboy-green-lightest px-4 py-2 text-xl font-display text-gameboy-green-darkest rounded hover:bg-gameboy-green-light"
          to="/join">
          Join session
        </Link>
      </div>
    </div>
  )
}

export default SessionLanding
