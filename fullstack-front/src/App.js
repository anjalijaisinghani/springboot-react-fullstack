import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';   
import Home from './pages/Home';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={ <ProtectedRoute> <Home /></ProtectedRoute> } />
            
            <Route exact path="/adduser" element={<ProtectedRoute>
                <AddUser />
              </ProtectedRoute>} />
            <Route exact path="/edituser/:id" element= {<ProtectedRoute><EditUser/></ProtectedRoute>}/>
            <Route exact path="/viewuser/:id" element= {<ProtectedRoute><ViewUser/></ProtectedRoute>}/>
            <Route exact path="/register" element= {<Register/>}/>
            <Route exact path="/login" element= {<Login/>}/>
      </Routes>
      
     
      </Router>
    </div>
  );
}

export default App;
