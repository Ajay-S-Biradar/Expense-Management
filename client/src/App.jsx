import './App.css';
import LandingPage from './pages/LandingPage';
import LoginSignUp from './pages/LoginSignUp';
import Sidebar from './pages/Sidebar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Incomes from './pages/Incomes';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import ViewTransactions from './pages/ViewTransactions';

function App() {
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <RouterProvider router={appRouter} />
    </div>
  );
}

const AppLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/user',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'expenses',
        element: <Expenses />,
      },
      {
        path: 'incomes',
        element: <Incomes />,
      },
      {
        path:'transactions',
        element:<ViewTransactions/>
      }
    ],
  },
  {
    path:'/',
    element:<LandingPage />
  },
  {
    path:'/entry',
    element:<LoginSignUp />
  }
]);

export default App;
