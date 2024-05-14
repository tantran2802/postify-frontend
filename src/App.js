import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './all-posts/posts';
import Login from './login/login';
import Posting from './posting/posting';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import HomePage from './layout/homepage';
import SearchingPost from './all-posts/posts-search';
import Signup from './login/signup';
const elements = [
  {
  path: "/",
  element: <HomePage />,
  children: [
    {
      path: "posts",
      element: <Posts />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: 'posting',
      element: <Posting/>
    },
    {
      path: 'searching',
      element: <SearchingPost/>
    },
    {
      path: 'signup',
      element: <Signup/>
    }
  ]
  }
];
const router = createBrowserRouter(elements);
function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
