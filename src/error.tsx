import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const errorMessage = location.state?.error || '发生了未知错误。';

    return (
        <div>
            <h1>出错了</h1>
            <p>{errorMessage}</p>
            <a href="/">返回首页</a>
        </div>
    );
};

export default ErrorPage;
