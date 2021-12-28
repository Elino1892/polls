import { Route, Routes } from 'react-router';
import AllPollsPage from './pages/AllPollsPage';
import HomePage from './pages/HomePage';
import PollPage from './pages/PollPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PollFinishedPage from './pages/PollFinishedPage'
import PollFilledPage from './pages/PollFilledPage'
import CreatePollPage from './pages/CreatePollPage';
import PollCreatedPage from './pages/PollCreatedPage';
import UserListScreen from './pages/UserListScreen';
import UserEditScreen from './pages/UserEditScreen';
import GroupListScreen from './pages/GroupListScreen';

import { Container } from 'react-bootstrap'
import GroupEditScreen from './pages/GroupEditScreen';
import GroupCreateScreen from './pages/GroupCreateScreen';
import PollListScreen from './pages/PollListScreen';
import Layout from './components/Layout/Layout/Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/polls" element={<AllPollsPage />}></Route>
          <Route path="/polls/:pollId" element={<PollPage />}></Route>
          <Route path="/polls/:pollId/finished-poll" element={<PollFinishedPage />}></Route>
          <Route path="/polls/:pollId/filled-poll" element={<PollFilledPage />}></Route>
          <Route path="/polls/create-poll" element={<CreatePollPage />}></Route>
          <Route path="/polls/created-poll" element={<PollCreatedPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/admin/userlist" element={<UserListScreen />}></Route>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />}></Route>
          <Route path="/admin/grouplist" element={<GroupListScreen />}></Route>
          <Route path="/admin/group/create" element={<GroupCreateScreen />}></Route>
          <Route path="/admin/group/:id/edit" element={<GroupEditScreen />}></Route>
          <Route path="/admin/polllist" element={<PollListScreen />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
