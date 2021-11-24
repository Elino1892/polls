import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import classes from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={classes.page}>
      <Nav />
      {children}
      <Footer />
    </div>

  )
}

export default Layout;