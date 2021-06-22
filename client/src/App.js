import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

// layouts
import AuthLayout from './layouts/AuthLayout';

// pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// components
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Route exact path='/login' render={() => (
          <AuthLayout Component={Login} />
        )} />
        <Route exact path='/signup' render={() => (
          <AuthLayout Component={Signup} />
        )} />
        <Route exact path='/forgot-password' render={() => (
          <AuthLayout Component={ForgotPassword} />
        )} />
        <Route exact path='/reset/:resetToken' render={() => (
          <AuthLayout Component={ResetPassword} />
        )} />
      </Router>
    </AuthProvider>
  );
}

export default App;
