import { useState, useEffect } from 'react'
import './App.css'

/**
 * 架构说明：
 * 1. BASE_URL 会根据 .env.development 或 .env.production 自动切换
 * 2. 如果环境变量未定义，则默认指向 localhost 以防报错
 */
const API_URL = `/api/health`;

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 定义获取数据的异步函数
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`正在请求后端: ${API_URL}`);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`服务器响应异常: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {/* 头部区域 */}
      <header className="header">
        <h1>🚀 HomeLab Dashboard</h1>
      </header>

      {/* 状态看板主卡片 */}
      <main className="card">
        <h3>后端服务状态</h3>
        
        {loading && (
          <div className="status-box loading">
            <div className="spinner"></div>
            <p>正在穿越隧道连接中...</p>
          </div>
        )}

        {error && (
          <div className="status-box error">
            <span className="icon">❌</span>
            <p>连接失败: {error}</p>
            <small>请检查后端是否启动及跨域设置</small>
          </div>
        )}

        {data && (
          <div className="status-box success">
            <div className="status-header">
              <span className="pulse-dot"></span>
              <strong>已在线</strong>
            </div>
            <pre className="json-display">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </main>

      {/* 页脚信息 */}
      <footer className="footer">
        <p>当前运行模式: <strong>{import.meta.env.MODE}</strong></p>
        <p>访问域名: <code>{window.location.hostname}</code></p>
        <p>API Endpoint: <code>{BASE_URL}</code></p>
      </footer>
    </div>
  )
}

export default App