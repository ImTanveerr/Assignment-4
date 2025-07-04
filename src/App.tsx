import { Outlet } from "react-router"
import Footer from "./layouts/Footer"
import Navbar from "./layouts/Navbar"

function App() {

  return (
    <>
      <Navbar/>
        <div className="container mx-auto py-10">
          <Outlet/>
        </div>
      <Footer/>
    </>
  )
}

export default App
