import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router , Routes, Route, useNavigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import TestCenters from './pages/TestCenters';
import Footer from './components/Footer';
import AppHeader from './components/AppHeader';
import TestCenter from './pages/TestCenters/TestCenter';
import TestCenterList from './containers/TestCenterList';
import { getTestCenters } from './services/api/testCenters';
import TestCenterEdit from './containers/TestCenterEdit';
import { useSelector } from 'react-redux';

import Registration from './pages/Register';
import Users from './pages/Users';


const MainLayout = ({ children }) => {

  
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};



const App = () => {
  const [testCenters, setTestCenters] = useState([]);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn)
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchTestCenters = async () => {
      try {
        const data = await getTestCenters();

        if (!Array.isArray(data)) {
          console.error('testCenters is not an array:', data);
          return;
        }
        setTestCenters(data);

        console.log(testCenters, "mytests");
      } catch (error) {
        console.error("Error fetching test centers:", error);
      }

     
    };

      if(isLoggedIn) {
        fetchTestCenters();
        navigate('/');
      } else {
        navigate('/login');
      }
  
  }, [isLoggedIn]);
  return (

     
     


        <Routes>
          <Route path="/login" element = {<Login/>} />
          <Route path="/register" element = {<Registration/>} /> 
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/test-centers" element={<TestCenters />} />
            <Route
              path="/test-centers"
              element={<TestCenterList testCenters={testCenters} />}
            />
            <Route
              path="test-center/:id"
              element={(props) => {
                const testCenter = testCenters.find(
                  (tc) => tc.id === parseInt(props.match.params.id, 10)
                );
                return testCenter ? (
                  <TestCenter testCenter={testCenter} />
                ) : null;
              }}
            />
          </Route>
       </Routes>
     


  );
};

export default App;
