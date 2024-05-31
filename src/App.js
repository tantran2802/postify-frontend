import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './all-posts/posts';
import Login from './login/login';
import Posting from './posting/posting';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { useEffect } from 'react'
import HomePage from './layout/homepage';
import SearchingPost from './all-posts/posts-search';
import Signup from './login/signup';
import Post from './all-posts/post';
import Image from './all-posts/image';
import NotFoundPage from './utilities/not-found-page';
import UnauthorizedPage from './utilities/unauthorized-page';
import { AuthProvider } from './utilities/authContext';
const elements = [
  {
  path: "/",
  element: <HomePage />,
  // loader: checkExpiredToken,
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
    },
    {
      path: 'posts/:postId',
      element: <Post/>
    },
    {
      path: 'posts/:postId/images/:imageId',
      element: <Image/>
    },
    {
      path: 'not-found',
      element: <NotFoundPage/>
    },
    {
      path: 'unauthorized',
      element: <UnauthorizedPage/>
    }
  ]
  }
];
const router = createBrowserRouter(elements);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App;
