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
import AddTestCenter from './components/addTestCenter/AddTestCenter';


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


        fetchTestCenters();
       
     
  
  }, [isLoggedIn]);
  return (

     
     


        <Routes>
          <Route path='/testcenters'   element= { <TestCenterList testCenters={testCenters} />} />
          <Route path="/testcenters-add"   element= { <AddTestCenter/>} />
          <Route path="/editTestCenter/:id" element={<TestCenterEdit />} />

        </Routes>
     


  );
};

export default App;
