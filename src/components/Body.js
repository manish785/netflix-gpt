import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Error';
import Detail from "./Detail";
import Series from "./Series";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browse',
            element: <Browse/>
        },
        {
            path: '/error',
            element: <Error/>
        },
        {
            path: '/detail/:id',
            element: <Detail/>
        },
        {
            path: '/TV:/id',
            element: <Series/>
        }
    ]);

    return (
        <div>
           <RouterProvider router={appRouter}/>
        </div>
    )
}


export default Body;