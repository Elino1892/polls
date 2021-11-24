import About from "../Layout/About/About";
import AvailablePolls from "../Layout/AvailablePolls/AvailablePolls";
import Header from "../Layout/Header/Header";
import Layout from "../Layout/Layout/Layout";



const StartingPageContent = () => {
  return (
    <Layout>
      <Header />
      <About />
      <AvailablePolls />
    </Layout>
  )
}

export default StartingPageContent;