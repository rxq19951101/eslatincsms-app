# OCPP Expo App

OCPP 充电应用的 React Native 客户端，使用 Expo 构建。

## 页面

- **Login**: 用户登录页面
- **Register**: 用户注册页面
- **Map**: 地图页面，显示充电桩位置（使用 react-native-maps）
- **Scan**: 二维码扫码页面（使用真实相机）
- **History**: 充电历史记录页面
- **Support**: 客服支持页面
- **Account**: 个人账户页面
- **Session**: 充电会话页面，显示充电桩状态与操作

## 功能

✅ **用户认证**：
- 注册新用户（生成唯一充电ID）
- 登录/退出
- 登录状态持久化

✅ **扫码充电**：
- 实时相机扫码（使用 expo-camera）
- 自动识别充电桩ID
- 支持 ASCII 二维码和标准二维码
- 跳转到充电会话页面

✅ **充电管理**：
- 查看充电桩状态
- 显示充电会话信息
- 授权和启动充电（待接入 OCPP 协议）

✅ **地图功能**：
- 使用 react-native-maps 显示真实地图
- 定位用户当前位置
- 显示充电桩标记点（绿色可用、橙色充电中、红色故障）
- 底部横向滑动充电桩卡片列表

✅ **多标签导航**：
- 底部标签导航：Support / Map / Scan / History / Account
- Scan 位于中央，突出显示
- Map 为默认页面

## 启动说明

### 前置要求

- Node.js 18+
- npm 或 yarn
- Expo CLI（可选）

### 安装依赖

```bash
cd app
npm install --legacy-peer-deps
```

### 启动开发服务器

```bash
# 启动 Expo 开发服务器
npm start

# 或指定平台
npm run ios        # iOS 模拟器
npm run android    # Android 模拟器
npm run web        # Web 浏览器
```

### 首次运行

1. 启动 Expo 开发服务器后，扫描终端显示的二维码
2. 或使用 iOS/Android 模拟器
3. 访问 `http://localhost:19006` 查看 Web 版本

### 二维码测试步骤

1. 启动充电桩模拟器（在项目根目录）
   ```bash
   docker compose up
   ```

2. 访问 Admin 界面查看充电桩二维码
   - 浏览器打开 `http://localhost:3000/chargers`
   - 每个充电桩卡片显示二维码图片

3. 启动 App 并测试扫码
   - 运行 `npm start`
   - 按 `w` 在浏览器中打开
   - 进入 Scan 页面
   - 使用相机扫描 Admin 界面上的二维码

4. 或者使用终端打印的 ASCII 二维码
   - 运行交互式模拟器：`python3 interactive.py --id CP-0001`
   - 终端会打印 ASCII 二维码
   - 使用 App 扫描终端中的二维码（需要相机对焦清晰）

### 配置 API 地址

在代码中修改 `screens/SessionScreen.tsx` 的 API 地址：

```typescript
const res = await fetch('http://YOUR_API_HOST:9000/chargers');
```

或在 `app.json` 中添加环境变量配置。

## 后续扩展

- [ ] 接入 WebSocket 实现 Authorize/StartTransaction
- [ ] 添加充电进度实时更新
- [ ] 集成推送通知
- [ ] 充电历史记录
- [ ] 个人中心页面

## 注意事项

- 此应用为本地测试用途，未实现完整生产级功能
- Session 页面当前使用假数据作为 fallback
- 用户数据存储在本地（AsyncStorage），清除应用数据会丢失
- 扫码功能使用真实相机，需要权限授权

