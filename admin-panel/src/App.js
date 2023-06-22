import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

import store from "./store";
import { Provider } from "react-redux";

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
    }
  }, [isLoggedIn]);
  return (

      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() => (
              <MainLayout >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/appointments" component={Appointments} />
                  <Route path="/test-centers" component={TestCenters} />
                  <Route
                    path="/test-centers"
                    render={(props) => (
                      <TestCenterList {...props} testCenters={testCenters} />
                    )}
                  />
                  <Route
                    path="/test-center/:id"
                    render={(props) => {
                      const testCenter = testCenters.find(
                        (tc) => tc.id === parseInt(props.match.params.id, 10)
                      );
                      return testCenter ? (
                        <TestCenter {...props} testCenter={testCenter} />
                      ) : null;
                    }}
                  />
                </Switch>
              </MainLayout>
            )}
          />
        </Switch>
      </Router>

  );
};

export default App;
