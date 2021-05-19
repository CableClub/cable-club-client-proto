import {Context, initialState, reducer} from './store'

import SessionLanding from './components/sessions/SessionLanding'
import {useReducer} from 'react'

function App() {
  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{store, dispatch}}>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-50">
        <SessionLanding />
      </div>
    </Context.Provider>
  )
}

export default App
