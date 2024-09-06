import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from './authService';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log('Handling login callback...');
                await userManager.signinRedirectCallback();
                console.log('Login callback processed successfully.');
                navigate('/'); // 登录成功后重定向到首页
            } catch (error) {
                console.error('Login callback failed:', error);
                // 可选: 提供用户友好的错误消息或重定向到错误页面
                navigate('/error'); // 假设你有一个错误页面
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div>
            <p>正在处理，请稍等...</p>
        </div>
    );
};

export default Callback;
