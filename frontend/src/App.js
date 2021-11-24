import { Route, Routes } from 'react-router';
import AllPollsPage from './pages/AllPollsPage';
import HomePage from './pages/HomePage';
import PollPage from './pages/PollPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/polls" element={<AllPollsPage />}></Route>
        <Route path="/polls/:pollId" element={<PollPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
