import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from './paths';
import { Authorize } from './pages/Authorize/Authorize';
import { Register } from './pages/Register/Register';
// import { useGetPostQuery } from './app/services/api';
import { ConfigProvider, theme } from 'antd';
// import { HOST } from './app/services/api';
// import { Post } from './app/services/types';
import './App.css';
import { Auth } from './features/auth/Auth';
import { Posts } from './pages/Posts/Posts';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Posts />
  },
  {
    path: Paths.authorize,
    element: <Authorize />
  },
  {
    path: Paths.register,
    element: <Register />
  }
]);

function App() {
  // const {data=[]} = useGetPostQuery({
  //   url: `${HOST}/posts`,
  // });
  return (
    <div className="App">
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <Auth>
          <RouterProvider router={ router } />
        </Auth>
        {/* <ul>
          {data.map((item: Post) =>
            <li key={item.id}>
              {item.text}
            </li>
          )}
        </ul> */}
      </ConfigProvider>
    </div>
  );
}

export default App;
