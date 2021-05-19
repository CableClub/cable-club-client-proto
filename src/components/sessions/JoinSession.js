import {Form, Formik} from 'formik'
import {
  RESET_SESSION,
  SEEKING_SESSION_STATE,
  SESSION_INACTIVE_STATE,
  SET_SESSION_CODE,
} from '../../constants'

import {Context} from '../../store'
import {Link} from 'react-router-dom'
import loadingGif from '../../assets/img/load.gif'
import {useContext} from 'react'

function JoinSession() {
  const {store, dispatch} = useContext(Context)
  const {session} = store

  let activeComponent
  switch (session.state) {
    case SEEKING_SESSION_STATE: {
      activeComponent = <SeekingSession />
      break
    }
    case SESSION_INACTIVE_STATE: {
      activeComponent = <SessionCodeForm />
      break
    }
    default:
      throw new Error('Invalid session state')
  }

  return activeComponent
}

function SeekingSession() {
  const {store, dispatch} = useContext(Context)
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1>Searching for your session...</h1>
      <img alt="" src={loadingGif} width="20" />
      <span
        className="text-sm underline cursor-pointer"
        onClick={() => {
          dispatch({type: RESET_SESSION})
        }}
        role="button">
        Cancel
      </span>
    </div>
  )
}

function SessionCodeForm() {
  const {store, dispatch} = useContext(Context)
  const {session} = store

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <label htmlFor="code">
        <h1>Enter your code</h1>
      </label>

      <Formik
        initialValues={{code: ''}}
        onSubmit={(values, {setSubmitting}) => {
          dispatch({
            type: SET_SESSION_CODE,
            code: values.code,
          })
          setSubmitting(false)
        }}>
        {({isSubmitting, values, handleChange}) => (
          <Form className="flex items-center justify-center space-x-3">
            <input
              autoComplete="off"
              className="focus:border-gameboy-green-lightest focus:ring-1 focus:ring-gameboy-green-lightest focus:outline-none w-4/12 text-center font-display uppercase text-4xl text-gray-900 placeholder-gray-500 border border-gameboy-green-lightest rounded-md py-3"
              id="code"
              name="code"
              onChange={(e) => {
                // code won't be over 6 characters
                if (e.target.value.length > 6) return false

                // code will only be letters and numbers
                const simpleUuidRegex = /^[a-zA-Z0-9]*$/
                if (!e.target.value.match(simpleUuidRegex)) return false

                handleChange(e)
              }}
              placeholder="------"
              required={true}
              type="text"
              value={values.code}
            />
            <button
              className="font-display text-4xl rounded-md py-3 px-5 bg-gameboy-green-lightest text-gameboy-green-darkest disabled:bg-gameboy-green"
              disabled={
                values.code.length < 6 ||
                isSubmitting ||
                session.state !== SESSION_INACTIVE_STATE
              }
              type="submit">
              Go
            </button>
          </Form>
        )}
      </Formik>

      <Link className="text-sm underline" to="/">
        Go back
      </Link>
    </div>
  )
}

export default JoinSession
