import { UserManager, UserManagerSettings } from 'oidc-client';

// 配置项
const config: UserManagerSettings = {
    authority: 'https://localhost:44351', // 授权服务器的基础 URL
    client_id: 'ORS_React', // 从你的配置中提取的 ClientId
    redirect_uri: 'http://localhost:5173/callback', // 登录后的重定向地址
    response_type: 'code', // 使用 authorization code 流程
    scope: 'CAM', // 所需的权限范围
    post_logout_redirect_uri: 'http://localhost:5173', // 登出后的重定向地址
    // 其他配置项
};

const userManager = new UserManager(config);

export default userManager;
