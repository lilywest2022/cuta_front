import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '20px 0' }}>
      <div className="mfbox" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="footer_left" style={{ textAlign: 'center' }}>
          <h3>欢迎加入我们的社区:</h3>
          <ul style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
            <li style={{ margin: '0 10px' }}>
              <a href="https://x.com/Cuta_games"><img src="./Images/footer_icon1.png" alt="" /></a>
            </li>
            <li style={{ margin: '0 10px' }}>
              <a href="https://discord.gg/MuEfuEJmrC"><img src="./Images/footer_icon2.png" alt="" /></a>
            </li>
          </ul>
        </div>
        <div className="footer_right" style={{ textAlign: 'center' }}>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            display: 'flex',  // 添加 flex 布局
            gap: '20px'       // 添加间距
          }}>
            <li style={{ margin: '20px 0' }}>
              <div className="pic"><img src="./Images/qrcode1.png" alt="" /></div>
              <h3>Business Cooperation</h3>
            </li>
            <li style={{ margin: '20px 0' }}>
              <div className="pic"><img src="./Images/qrcode2.png" alt="" /></div>
              <h3>Telegram official<br />communication group</h3>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
