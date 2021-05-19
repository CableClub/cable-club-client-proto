import {ACTIVE_SESSION_STATE, RESET_SESSION} from '../../constants'
import {useContext, useEffect} from 'react'

import {Context} from '../../store'
import {useHistory} from 'react-router-dom'

function ConnectedSession() {
  // routing
  const history = useHistory()

  // store
  const {store, dispatch} = useContext(Context)
  const {session} = store

  useEffect(() => {
    if (session.state === ACTIVE_SESSION_STATE && session.code) {
      function cleanupSession() {
        console.log('cleaning up session', session)
        // simulate async cleanup
        const timeout = window.setTimeout(() => {
          console.log('done cleaning up')
        }, 1000)

        return () => {
          window.clearTimeout(timeout)
        }
      }

      // active session is being killed by user. return cleanup function
      return () => {
        cleanupSession()
      }
    }
  }, [session])

  if (session.state !== ACTIVE_SESSION_STATE || !session.code)
    history.replace('/')
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1>You are in session:</h1>
      <span className="text-7xl font-display bg-gameboy-green-lightest text-gameboy-green-darkest p-4 rounded-md">
        {session.code}
      </span>
      <span
        className="text-sm underline cursor-pointer"
        onClick={() => {
          dispatch({type: RESET_SESSION})
          history.replace('/')
        }}
        role="button">
        Leave session
      </span>
    </div>
  )
}

export default ConnectedSession
