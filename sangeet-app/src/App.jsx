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
import AddNewPage from './pages/AddNewPage';
import { UserProvider, useUser } from './context/UserContext';
import AdminPage from './pages/AdminPage';


const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element = {<MainLayout />} >

        <Route index element = {<HomePage /> } />
        <Route path='/SignUpPage' element = {<SignupPage /> } />
        <Route path ='/LoginPage' element = { <LoginPage />} />
        <Route path = '/UploadsPage' element = { <UploadsPage />}/>
        <Route path = '/ExplorePage' element = {<ExplorePage/>}/>
        <Route path = '/AddNewPage' element = {<AddNewPage/>}/>
        <Route path = '/AdminPage' element = {<AdminPage/>}/>
       

    </Route>
    )
);

const App = () => {
    return(
    <UserProvider>
        <RouterProvider router= {router}/>;
    </UserProvider>
    );
};

export default App;

// import {
//     Route,
//     createBrowserRouter,
//     createRoutesFromElements,
//     RouterProvider,
//   } from "react-router-dom";
//   import HomePage from "./pages/HomePage";
//   import MainLayout from "./layouts/MainLayout";
//   import SignupPage from "./pages/SignupPage";
//   import LoginPage from "./pages/LoginPage";
//   import UploadsPage from "./pages/UploadsPage";
//   import ExplorePage from "./pages/ExplorePage";
//   import AddNewPage from "./pages/AddNewPage";
//   import AdminPage from "./pages/AdminPage";
//   import { UserProvider, useUser } from "./context/UserContext";
// //   import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
//   import ProtectedRoute from "./layouts/ProtectedRoute";
//   // Custom Router Component to Define Routes Dynamically
//   const AppRouter = () => {
//     const { user } = useUser();
  
//     const router = createBrowserRouter(
//       createRoutesFromElements(
//         <Route path="/" element={<MainLayout />}>
//           {/* Public Routes */}
//           <Route index element={<HomePage />} />
//           <Route path="/SignUpPage" element={<SignupPage />} />
//           <Route path="/LoginPage" element={<LoginPage />} />
//           <Route path="/UploadsPage" element={<UploadsPage />} />
//           <Route path="/ExplorePage" element={<ExplorePage />} />
//           <Route path="/AddNewPage" element={<AddNewPage />} />
  
//           {/ Conditional Admin Route */}
//           {user?.role === "admin" && (
//             <Route
//               element={<ProtectedRoute requiredRole="admin" />}
//             >
//               <Route path="/AdminPage" element={<AdminPage />} />
//              </Route>
//           )}
//         </Route>
//       )
//     );
  
//     return <RouterProvider router={router} />;
//   };
  
//   const App = () => {
//     return (
//       <UserProvider>
//         <AppRouter />
//       </UserProvider>
//     );
//   };
  
//   export default App;
  