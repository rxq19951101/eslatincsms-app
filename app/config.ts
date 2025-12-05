/**
 * 本文件定义 App 的 API 配置。
 * 根据不同环境使用不同的 CSMS 地址。
 * 
 * 生产环境：使用环境变量 CSMS_API_BASE（如果设置）
 * 开发环境：使用本地 IP 或 localhost
 */

import { Platform } from 'react-native';

// ===== 环境配置 =====
// 优先使用环境变量（生产环境）
// 在构建时可以通过 expo 的 app.config.js 或 eas.json 配置
const PRODUCTION_API_BASE = process.env.EXPO_PUBLIC_CSMS_API_BASE || process.env.CSMS_API_BASE;

// ===== 开发环境配置 =====
// 您的电脑 IP 地址（用于真机连接开发环境）
// 获取方法：macOS/Linux 运行 ifconfig，Windows 运行 ipconfig
const COMPUTER_IP = '192.168.20.58'; // 修改为您的电脑 IP

// 根据运行平台选择 CSMS 地址
let CSMS_API_BASE: string;

if (PRODUCTION_API_BASE) {
  // 生产环境：使用环境变量配置的地址
  CSMS_API_BASE = PRODUCTION_API_BASE;
} else {
  // 开发环境：根据平台选择
  if (Platform.OS === 'android') {
    // Android：模拟器用 10.0.2.2，真机用电脑 IP
    // 暂时统一用电脑 IP，避免真机连不上
    CSMS_API_BASE = `http://${COMPUTER_IP}:9000`;
  } else if (Platform.OS === 'ios') {
    // iOS：使用电脑 IP（适用于真机和模拟器）
    CSMS_API_BASE = `http://${COMPUTER_IP}:9000`;
  } else {
    // Web 浏览器：使用 localhost
    CSMS_API_BASE = 'http://localhost:9000';
  }
}

export { CSMS_API_BASE };

export const API_ENDPOINTS = {
  chargers: `${CSMS_API_BASE}/chargers`,
  messages: `${CSMS_API_BASE}/api/messages`,
  remoteStart: `${CSMS_API_BASE}/api/remoteStart`,
  remoteStop: `${CSMS_API_BASE}/api/remoteStop`,
  orders: `${CSMS_API_BASE}/api/orders`,
  currentOrder: `${CSMS_API_BASE}/api/orders/current`,
  health: `${CSMS_API_BASE}/health`,
};

// 打印当前使用的 API 地址，方便调试（必须在 API_ENDPOINTS 定义之后）
console.log(`[Config] Platform: ${Platform.OS}, API Base: ${CSMS_API_BASE}`);
console.log(`[Config] Chargers endpoint: ${API_ENDPOINTS.chargers}`);
