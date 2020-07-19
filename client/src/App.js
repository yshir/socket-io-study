import React, { useState } from 'react'
import Client from './Client'

const App = () => {
  const [loadClient, setLoadClient] = useState(true)

  return (
    <>
      <button onClick={() => setLoadClient(prevState => !prevState)}>
        Stop client
      </button>
      {loadClient ? <Client /> : null}
    </>
  )
}

export default App
