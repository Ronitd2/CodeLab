import CodeSection from "./Pages/CodeSection"
import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
function App() {
  

  return (
    <>
    <div className='w-screen h-full flex justify-center items-center'>
    {/* <div className=" overflow-auto h-full w-[1500px]"> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/codesection' element={<CodeSection />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    {/* </div> */}
    </div>
    </>
  )
}

export default App
