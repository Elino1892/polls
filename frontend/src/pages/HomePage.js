// localhost:3000/

import About from '../components/Layout/About/About'
// import AvailablePolls from "../Layout/AvailablePolls/AvailablePolls";
import Header from "../components/Layout/Header/Header";
import Layout from "../components/Layout/Layout/Layout";

const HomePage = () => {
  return <Layout>
    <Header />
    <About />
    {/* <AvailablePolls /> */}
  </Layout>
}

export default HomePage;