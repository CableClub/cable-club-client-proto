import {Form, Formik} from 'formik'

import {Link} from 'react-router-dom'

function JoinSession() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <label htmlFor="code">
        <h1>Enter your code</h1>
      </label>

      <Formik
        initialValues={{code: ''}}
        onSubmit={(values, {setSubmitting}) => {
          console.log(values)
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
              disabled={values.code.length < 6 || isSubmitting}
              type="submit">
              Go
            </button>
          </Form>
        )}
      </Formik>

      <Link className="text-sm underline" to="/">
        Cancel
      </Link>
    </div>
  )
}

export default JoinSession
