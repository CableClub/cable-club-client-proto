import {
  ACTIVE_SESSION_STATE,
  RESET_SESSION,
  SET_SESSION_CODE,
  SET_SESSION_STATE,
} from '../../constants'
import {useContext, useEffect, useState} from 'react'

import {Context} from '../../store'
import loadingGif from '../../assets/img/load.gif'
import {useHistory} from 'react-router-dom'

function StartSession() {
  // local state
  const [code, setCode] = useState(null)

  // routing
  const history = useHistory()

  // store
  const {dispatch} = useContext(Context)

  function endSession() {
    console.log('ending session')
    dispatch({type: RESET_SESSION})
    console.log('ended session')
    history.replace('/')
  }

  // Request session code if we do not have one
  useEffect(() => {
    if (!code) {
      async function fetchSessionCode() {
        console.log('fetching session code')
        const response = await new Promise((resolve) => {
          window.setTimeout(() => {
            resolve({code: Math.random().toString().slice(2, 8)})
          }, 800)
        })

        console.log('got code response', response)
        setCode(response.code)
      }

      fetchSessionCode()
    }
  }, [code, setCode])

  // Watch for join session event
  useEffect(() => {
    if (code) {
      const timeout = window.setTimeout(() => {
        console.log('joining session ' + code)
        dispatch({type: SET_SESSION_CODE, code})
        dispatch({type: SET_SESSION_STATE, state: ACTIVE_SESSION_STATE})
        history.replace('/session')
      }, 8000)

      return () => {
        // clean up any joining side effects
        window.clearTimeout(timeout)
      }
    }
  }, [code, dispatch, history])

  if (!code) return <GettingSessionCode />
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h1>Your Cable Club code is:</h1>
        <span className="text-7xl font-display bg-gameboy-green-lightest text-gameboy-green-darkest p-4 rounded-md">
          {code}
        </span>
        <span>
          Have your Player 2 click "Join Session" and enter this code.
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2>Searching for a partner...</h2>
        <img alt="" src={loadingGif} width="20" />
      </div>
      <span
        className="text-sm underline cursor-pointer"
        onClick={() => {
          endSession()
        }}
        role="button">
        End Session
      </span>
    </div>
  )
}

function GettingSessionCode() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img alt="" src={loadingGif} width="20" />
    </div>
  )
}

export default StartSession
