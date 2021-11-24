import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="page">
      <Nav />
      {children}
      <Footer />
    </div>

  )
}

export default Layout;