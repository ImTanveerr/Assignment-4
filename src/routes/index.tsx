import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";
import {
    createBrowserRouter,
} from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/books',
                element: <AllBooks />
            },
            {
                path: '/create-book',
                element: <AddBook />
            },
            {
                path: '/borrow-summary',
                element: <BorrowSummary />
            },
        ]
    }
])

export default router