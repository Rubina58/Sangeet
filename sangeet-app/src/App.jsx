import {Route, 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UploadsPage from './pages/UploadsPage';
import ExplorePage from './pages/ExplorePage';


const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element = {<MainLayout />} >

        <Route index element = {<HomePage /> } />
        <Route path='/SignUpPage' element = {<SignupPage /> } />
        <Route path ='/LoginPage' element = { <LoginPage />} />
        <Route path = '/UploadsPage' element = { <UploadsPage />}/>
        <Route path = '/ExplorePage' element = {<ExplorePage/>}/>
    </Route>
    )
);

const App = () => {
  return <RouterProvider router= {router}/>;
};

export default App;