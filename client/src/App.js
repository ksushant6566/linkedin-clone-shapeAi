import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

// components
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
