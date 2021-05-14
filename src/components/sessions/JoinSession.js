import {Link} from 'react-router-dom'

function JoinSession() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1>Enter your code</h1>
      <input
        className="focus:border-gameboy-green-lightest focus:ring-1 focus:ring-gameboy-green-lightest focus:outline-none w-4/12 text-center text-4xl text-gray-900 placeholder-gray-500 border border-gameboy-green-lightest rounded-md py-3"
        type="text"
      />
      <Link className="text-sm underline" to="/">
        Cancel
      </Link>
    </div>
  )
}

export default JoinSession
