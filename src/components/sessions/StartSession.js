import {Link} from 'react-router-dom'

function StartSession() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1>Your Cable Club code is</h1>
      <span className="text-7xl font-display">XXXXXX</span>
      <span>Have your Player 2 click "Join Session" and enter this code.</span>
      <Link className="text-sm underline" to="/">
        End Session
      </Link>
    </div>
  )
}

export default StartSession
