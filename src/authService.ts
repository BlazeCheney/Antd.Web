import { UserManager, User, UserManagerSettings } from 'oidc-client';

// 配置项
const config: UserManagerSettings = {
    authority: 'https://localhost:44351', // 授权服务器的基础 URL
    client_id: 'ORS_React', // 从你的配置中提取的 ClientId
    redirect_uri: 'http://localhost:5173/callback', // 登录后的重定向地址
    response_type: 'code', // 使用 authorization code 流程
    scope: 'CAM', // 所需的权限范围
    post_logout_redirect_uri: 'http://localhost:5173', // 登出后的重定向地址
};

const userManager = new UserManager(config);

// 初始化时捕获错误
userManager.getUser().catch((error) => {
    console.error('Error initializing userManager:', error);
});

// 自动签入回调
userManager.signinSilentCallback().catch((error) => {
    console.error('Silent sign-in failed:', error);
});

// 检查用户会话
export async function checkSession(): Promise<User | null> {
    try {
        const user = await userManager.getUser();
        console.log('user:', user);
        return user;
    } catch (error) {
        console.error('Failed to retrieve user session:', error);
        return null;
    }
}

// 登录
export async function login() {
    try {
        const state = generateState(); // 生成状态
        localStorage.setItem('oidc_state', state); // 存储状态
        await userManager.signinRedirect({ state });
    } catch (error) {
        console.error('Login failed:', error);
    }
}

// 登录回调
export async function loginCallback() {
    try {
        const state = localStorage.getItem('oidc_state');
        if (!state) {
            throw new Error('State not found in local storage');
        }

        await userManager.signinRedirectCallback();
        localStorage.removeItem('oidc_state'); // 清除状态
    } catch (error) {
        console.error('Login callback failed:', error);
        throw error;
    }
}

// 注销
export async function logout() {
    try {
        await userManager.signoutRedirect();
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// 注销回调
export async function logoutCallback() {
    try {
        await userManager.signoutRedirectCallback();
    } catch (error) {
        console.error('Logout callback failed:', error);
    }
}

// 生成随机状态
function generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default userManager;