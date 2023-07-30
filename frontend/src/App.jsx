import { BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home, Login, Register} from './components'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App