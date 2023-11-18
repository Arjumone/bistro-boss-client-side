import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className=" justify-center items-center">
            404
            <Link to='/' className=" bg-red-600">Go Back Home </Link>
        </div>
    );
};

export default ErrorPage;