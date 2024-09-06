import { useEffect, useState } from 'react';
import './App.css';
import { Button } from 'antd';
import { User } from 'oidc-client';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import userManager, { checkSession, login, logout } from './authService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Callback from './callback';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // 获取当前用户
        const currentUser = await checkSession();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to get user:', error);
      }
    };

    loadUser();

    const handleUserLoaded = (user: User) => setUser(user);
    const handleUserUnloaded = () => setUser(null);

    userManager.events.addUserLoaded(handleUserLoaded);
    userManager.events.addUserUnloaded(handleUserUnloaded);

    return () => {
      userManager.events.removeUserLoaded(handleUserLoaded);
      userManager.events.removeUserUnloaded(handleUserUnloaded);
    };
  }, []);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div>
              {user ? (
                <>
                  <p>Welcome!</p>
                  <p>用户名: {user?.profile?.name ?? "未知用户"}</p>
                  <Button icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Button type='primary' icon={<LoginOutlined />} onClick={handleLogin}>Login</Button>
              )}
            </div>
            <h1>ORS React</h1>
            <p className="read-the-docs">
              Openiddict 授权中心 测试
            </p>
            <Button type='primary' target='_blank' href='https://ant-design.antgroup.com/index-cn'>Antd 国内镜像</Button>
          </>
        } />
        <Route path="/callback" element={<Callback />} />
        <Route path="/error" element={<div>出错了，请稍后再试。</div>} />
      </Routes>
    </Router>
  );
}

export default App;