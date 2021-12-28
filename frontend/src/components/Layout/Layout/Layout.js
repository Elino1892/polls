import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navigation from "../Nav/Navigation";
import classes from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={classes.page}>
      <Navigation />
      <main className="py-3">
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </div>

  )
}

export default Layout;