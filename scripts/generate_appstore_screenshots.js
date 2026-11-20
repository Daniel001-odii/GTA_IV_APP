const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to encode local image to base64
function getBase64Image(relPath) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

// Load common assets
const appIcon = getBase64Image('assets/icon.png');
const heroVice = getBase64Image('assets/images/art/hero-vice.jpg');
const collageCover = getBase64Image('assets/images/art/collage-cover.jpg');
const convertibleSkyline = getBase64Image('assets/images/art/convertible-skyline.jpg');
const bayJetskis = getBase64Image('assets/images/art/bay-jetskis.jpg');
const streetDuo = getBase64Image('assets/images/art/street-duo.jpg');

const gamepad = {
  ps_triangle: getBase64Image('assets/icons/gamepad/ps_triangle.png'),
  ps_circle: getBase64Image('assets/icons/gamepad/ps_circle.png'),
  ps_x: getBase64Image('assets/icons/gamepad/ps_x.png'),
  ps_square: getBase64Image('assets/icons/gamepad/ps_square.png'),
  ps_l1: getBase64Image('assets/icons/gamepad/ps_l1.png'),
  ps_r1: getBase64Image('assets/icons/gamepad/ps_r1.png'),
  ps_l2: getBase64Image('assets/icons/gamepad/ps_l2.png'),
  ps_r2: getBase64Image('assets/icons/gamepad/ps_r2.png'),
  xb_a: getBase64Image('assets/icons/gamepad/xb_a.png'),
  xb_b: getBase64Image('assets/icons/gamepad/xb_b.png'),
  xb_x: getBase64Image('assets/icons/gamepad/xb_x.png'),
  xb_y: getBase64Image('assets/icons/gamepad/xb_y.png'),
  xb_lb: getBase64Image('assets/icons/gamepad/xb_lb.png'),
  xb_rb: getBase64Image('assets/icons/gamepad/xb_rb.png'),
  xb_lt: getBase64Image('assets/icons/gamepad/xb_lt.png'),
  xb_rt: getBase64Image('assets/icons/gamepad/xb_rt.png'),
  dpad_up: getBase64Image('assets/icons/gamepad/generic_dpad_up.png'),
  dpad_down: getBase64Image('assets/icons/gamepad/generic_dpad_down.png'),
  dpad_left: getBase64Image('assets/icons/gamepad/generic_dpad_left.png'),
  dpad_right: getBase64Image('assets/icons/gamepad/generic_dpad_right.png'),
};

// SVG Platform logos
const psLogoSvg = `<svg width="22" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.666 0C10.82 0 10.15.54 10.15 1.25V13.88L6.46 12.5C4.7 11.84 3.73 10.42 4.29 9.32C4.76 8.4 5.92 8.35 6.94 8.74L8.14 9.19V6.75L6.68 6.2C4.34 5.32 1.68 5.71.69 7.64C-.34 9.68 1.05 12.39 4.19 13.56L10.15 15.79V17.06C10.15 17.58 10.53 18 11.16 18C11.79 18 12.17 17.58 12.17 17.06V1.25C12.17.54 11.51 0 10.666 0h1z" fill="currentColor"/></svg>`;
const xbLogoSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm3.89 4.11a8.47 8.47 0 0 0-7.78 0C7.14 6.85 5.56 8.64 4.5 10.5c1.46 1.83 3.65 3.12 5.57 4.12-.9-1.2-1.42-2.58-1.57-3.92 1.05-1.12 2.37-2.07 3.5-2.7 1.13.63 2.45 1.58 3.5 2.7-.15 1.34-.67 2.72-1.57 3.92 1.92-1 4.11-2.29 5.57-4.12-1.06-1.86-2.64-3.65-3.61-4.39z" fill="currentColor"/></svg>`;
const pcLogoSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M6 20h12M12 16v4"/></svg>`;

function renderButtonIcon(btn, size = 32) {
  const src = gamepad[btn];
  if (!src) return '';
  return `<img src="${src}" style="width:${size}px;height:${size}px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));" />`;
}

function renderHtmlTemplate({ badge, headline, subtitle, activeTab, innerScreenHtml, gradientTheme = 'pink' }) {
  const gradientMap = {
    pink: 'linear-gradient(135deg, #FF4FA3 0%, #FF7A3D 50%, #FFD700 100%)',
    cyan: 'linear-gradient(135deg, #2CE5E0 0%, #9B5CFF 70%, #FF4FA3 100%)',
    orange: 'linear-gradient(135deg, #FF7A3D 0%, #FF4FA3 60%, #9B5CFF 100%)',
    purple: 'linear-gradient(135deg, #9B5CFF 0%, #2CE5E0 100%)',
  };
  const titleGradient = gradientMap[gradientTheme] || gradientMap.pink;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
  
  body {
    width: 1242px;
    height: 2688px;
    background: #0B0914;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #FFFFFF;
    position: relative;
    overflow: hidden;
  }

  /* Vice City Ambient Neon Lighting */
  .glow-top-left {
    position: absolute;
    top: -100px;
    left: -150px;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 79, 163, 0.32) 0%, rgba(255, 79, 163, 0) 70%);
    pointer-events: none;
  }
  .glow-top-right {
    position: absolute;
    top: 50px;
    right: -120px;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(44, 229, 224, 0.25) 0%, rgba(44, 229, 224, 0) 70%);
    pointer-events: none;
  }
  .glow-center {
    position: absolute;
    top: 1100px;
    left: 200px;
    width: 850px;
    height: 850px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(155, 92, 255, 0.18) 0%, rgba(155, 92, 255, 0) 70%);
    pointer-events: none;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }

  /* Marketing Header */
  .marketing-header {
    position: absolute;
    top: 90px;
    left: 0;
    width: 1242px;
    padding: 0 60px;
    text-align: center;
    z-index: 10;
  }
  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 24px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 79, 163, 0.45);
    border-radius: 999px;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #2CE5E0;
    box-shadow: 0 4px 20px rgba(255, 79, 163, 0.2);
    margin-bottom: 24px;
  }
  .marketing-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 78px;
    font-weight: 900;
    letter-spacing: 2px;
    line-height: 1.04;
    text-transform: uppercase;
    background: ${titleGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 24px rgba(255, 79, 163, 0.4));
  }
  .marketing-subtitle {
    font-size: 32px;
    font-weight: 500;
    color: #B5B0D6;
    line-height: 1.35;
    max-width: 1000px;
    margin: 18px auto 0 auto;
  }

  /* Phone Mockup */
  .phone-container {
    position: absolute;
    top: 540px;
    left: 106px;
    width: 1030px;
    height: 2200px;
    background: #0B0914;
    border-radius: 68px;
    border: 12px solid #2B2642;
    box-shadow: 
      0 40px 100px rgba(0, 0, 0, 0.95),
      0 0 80px rgba(255, 79, 163, 0.2),
      inset 0 0 4px rgba(255, 255, 255, 0.2);
    overflow: hidden;
    z-index: 5;
    display: flex;
    flex-direction: column;
  }

  /* iPhone Dynamic Island & Status Bar */
  .phone-status-bar {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 44px;
    font-size: 22px;
    font-weight: 600;
    color: #FFFFFF;
    background: #0B0914;
    position: relative;
    z-index: 20;
  }
  .dynamic-island {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 14px;
    width: 250px;
    height: 44px;
    background: #000000;
    border-radius: 24px;
  }

  /* Inner Screen Content */
  .screen-viewport {
    flex: 1;
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #0B0914;
  }

  /* Floating Bottom Nav Dock */
  .bottom-dock {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 720px;
    height: 84px;
    background: rgba(18, 14, 32, 0.88);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 79, 163, 0.3);
    border-radius: 42px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 24px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 79, 163, 0.25);
    z-index: 30;
  }
  .dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    color: #6E688A;
  }
  .dock-item.active {
    background: linear-gradient(135deg, rgba(255, 79, 163, 0.25), rgba(44, 229, 224, 0.25));
    border: 1px solid #FF4FA3;
    color: #FF4FA3;
    box-shadow: 0 0 16px rgba(255, 79, 163, 0.5);
  }

  /* Common UI Elements inside Phone */
  .platform-tabs {
    display: flex;
    gap: 12px;
    padding: 12px 32px;
    background: #0B0914;
  }
  .tab-pill {
    flex: 1;
    height: 52px;
    border-radius: 26px;
    background: #171329;
    border: 1px solid #2B2642;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 19px;
    font-weight: 700;
    color: #8C86A8;
  }
  .tab-pill.active {
    background: linear-gradient(135deg, rgba(44, 229, 224, 0.2), rgba(155, 92, 255, 0.2));
    border: 1.5px solid #2CE5E0;
    color: #FFFFFF;
    box-shadow: 0 0 20px rgba(44, 229, 224, 0.35);
  }

  .cheat-card {
    background: rgba(23, 19, 41, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    margin: 0 32px 18px 32px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-badge {
    padding: 5px 14px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 34px;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #FFFFFF;
  }
  .combo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    padding: 10px 14px;
    background: rgba(11, 9, 20, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
  }
  .pc-chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 10px;
    background: rgba(44, 229, 224, 0.12);
    border: 1px solid rgba(44, 229, 224, 0.3);
    color: #2CE5E0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
</style>
</head>
<body>
  <div class="glow-top-left"></div>
  <div class="glow-top-right"></div>
  <div class="glow-center"></div>
  <div class="grid-pattern"></div>

  <!-- Marketing Copy -->
  <div class="marketing-header">
    <div class="badge-pill">★ ${badge} ★</div>
    <div class="marketing-title">${headline}</div>
    <div class="marketing-subtitle">${subtitle}</div>
  </div>

  <!-- Phone Mockup -->
  <div class="phone-container">
    <div class="phone-status-bar">
      <span>9:41</span>
      <div class="dynamic-island"></div>
      <span style="display:flex;gap:8px;align-items:center;">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor"><path d="M1 4h2v6H1zM5 2h2v8H5zM9 0h2v10H9zM13 3h2v7h-2zM17 1h2v9h-2z"/></svg>
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="1" width="17" height="10" rx="3"/><path d="M20 4v4"/></svg>
      </span>
    </div>

    <div class="screen-viewport">
      ${innerScreenHtml}
    </div>

    <!-- Floating Dock -->
    <div class="bottom-dock">
      <div class="dock-item ${activeTab === 'all' ? 'active' : ''}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
      </div>
      <div class="dock-item ${activeTab === 'categories' ? 'active' : ''}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
      </div>
      <div class="dock-item ${activeTab === 'favorites' ? 'active' : ''}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="${activeTab === 'favorites' ? '#FF4FA3' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="dock-item ${activeTab === 'settings' ? 'active' : ''}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ----------------------------------------------------------------------------
// Screen 1: All Cheats (Hero Showcase)
// ----------------------------------------------------------------------------
const screen1Html = `
  <!-- Hero Art Section -->
  <div style="position:relative;width:100%;height:380px;overflow:hidden;">
    <img src="${heroVice}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />
    <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(11,9,20,0.1) 0%, rgba(11,9,20,0.65) 60%, #0B0914 100%);"></div>
    <div style="position:absolute;bottom:24px;left:32px;right:32px;">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(255,79,163,0.2);border:1px solid #FF4FA3;border-radius:12px;font-size:15px;font-weight:800;letter-spacing:1.5px;color:#2CE5E0;margin-bottom:10px;">
        ★ AUTHENTIC DATASET • 30 CHEAT CODES
      </div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;letter-spacing:2px;color:#FF4FA3;">GRAND THEFT AUTO VI</div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:900;letter-spacing:1px;line-height:1.05;color:#FFFFFF;">ALL CHEAT CODES</div>
    </div>
  </div>

  <!-- Sticky Platform Tabs -->
  <div class="platform-tabs">
    <div class="tab-pill active">
      ${psLogoSvg} PlayStation
    </div>
    <div class="tab-pill">
      ${xbLogoSvg} Xbox
    </div>
    <div class="tab-pill">
      ${pcLogoSvg} PC
    </div>
  </div>

  <!-- Search Bar -->
  <div style="margin:8px 32px 20px 32px;height:56px;background:#171329;border:1px solid #2B2642;border-radius:18px;display:flex;align-items:center;padding:0 20px;gap:14px;color:#6E688A;font-size:18px;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    <span>Search by cheat name or effect...</span>
  </div>

  <!-- Cheats List -->
  <div class="cheat-card" style="border-left:4px solid #FF4FA3;">
    <div class="card-top">
      <div class="card-badge" style="background:rgba(255,79,163,0.15);color:#FF4FA3;border:1px solid rgba(255,79,163,0.3);">COMBAT</div>
      <div class="pc-chip">TURTLE</div>
    </div>
    <div class="card-title">Max Health & Armor</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_triangle')}
      ${renderButtonIcon('ps_r2')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_square')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_square')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l1')}
    </div>
  </div>

  <div class="cheat-card" style="border-left:4px solid #2CE5E0;">
    <div class="card-top">
      <div class="card-badge" style="background:rgba(44,229,224,0.15);color:#2CE5E0;border:1px solid rgba(44,229,224,0.3);">PLAYER</div>
      <div class="pc-chip">PAINKILLER</div>
    </div>
    <div class="card-title">Invincibility (5 Minutes)</div>
    <div class="combo-row">
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('dpad_left')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_r1')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('dpad_left')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_triangle')}
    </div>
  </div>

  <div class="cheat-card" style="border-left:4px solid #FF7A3D;">
    <div class="card-top">
      <div class="card-badge" style="background:rgba(255,122,61,0.15);color:#FF7A3D;border:1px solid rgba(255,122,61,0.3);">VEHICLES</div>
      <div class="pc-chip">BUZZOFF</div>
    </div>
    <div class="card-title">Spawn Buzzard Attack Chopper</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l2')}
      ${renderButtonIcon('ps_r1')}
      ${renderButtonIcon('ps_triangle')}
    </div>
  </div>
`;

// ----------------------------------------------------------------------------
// Screen 2: Cross-Platform Gamepad Sequences
// ----------------------------------------------------------------------------
const screen2Html = `
  <div style="padding:32px 32px 18px 32px;">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:2px;color:#2CE5E0;">CROSS-PLATFORM INPUTS</div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:46px;font-weight:900;letter-spacing:1px;color:#FFFFFF;">PLATFORM CONTROLS</div>
    <div style="font-size:18px;color:#8C86A8;margin-top:6px;">High-resolution 300 DPI flat controller icons & triggers</div>
  </div>

  <!-- PlayStation Showcase Card -->
  <div class="cheat-card" style="border:1.5px solid rgba(44,229,224,0.35);background:linear-gradient(180deg, #1A1530 0%, #120E22 100%);">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:12px;color:#2CE5E0;">
        ${psLogoSvg}
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:1px;color:#FFFFFF;">PLAYSTATION 5 / 4</span>
      </div>
      <span style="font-size:15px;font-weight:800;color:#2CE5E0;background:rgba(44,229,224,0.12);padding:4px 12px;border-radius:10px;">WEAPONS & AMMO</span>
    </div>
    <div style="font-size:16px;color:#B5B0D6;">Give all weapons, shotguns, assault rifles, and maximum ammunition</div>
    <div class="combo-row" style="background:#0E0B1A;padding:14px 18px;gap:12px;">
      ${renderButtonIcon('ps_triangle', 36)}
      ${renderButtonIcon('ps_r2', 36)}
      ${renderButtonIcon('dpad_left', 36)}
      ${renderButtonIcon('ps_l1', 36)}
      ${renderButtonIcon('ps_x', 36)}
      ${renderButtonIcon('dpad_right', 36)}
      ${renderButtonIcon('ps_triangle', 36)}
      ${renderButtonIcon('dpad_down', 36)}
      ${renderButtonIcon('ps_square', 36)}
      ${renderButtonIcon('ps_l1', 36)}
      ${renderButtonIcon('ps_l1', 36)}
      ${renderButtonIcon('ps_l1', 36)}
    </div>
  </div>

  <!-- Xbox Showcase Card -->
  <div class="cheat-card" style="border:1.5px solid rgba(16,124,65,0.45);background:linear-gradient(180deg, #131E18 0%, #0E1511 100%);">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:12px;color:#107C41;">
        ${xbLogoSvg}
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:1px;color:#FFFFFF;">XBOX SERIES X|S / ONE</span>
      </div>
      <span style="font-size:15px;font-weight:800;color:#52E078;background:rgba(16,124,65,0.25);padding:4px 12px;border-radius:10px;">WEAPONS & AMMO</span>
    </div>
    <div style="font-size:16px;color:#B5B0D6;">Official trigger and bumper mappings rendered with authentic controller layout</div>
    <div class="combo-row" style="background:#09100C;padding:14px 18px;gap:12px;">
      ${renderButtonIcon('xb_y', 36)}
      ${renderButtonIcon('xb_rt', 36)}
      ${renderButtonIcon('dpad_left', 36)}
      ${renderButtonIcon('xb_lb', 36)}
      ${renderButtonIcon('xb_a', 36)}
      ${renderButtonIcon('dpad_right', 36)}
      ${renderButtonIcon('xb_y', 36)}
      ${renderButtonIcon('dpad_down', 36)}
      ${renderButtonIcon('xb_x', 36)}
      ${renderButtonIcon('xb_lb', 36)}
      ${renderButtonIcon('xb_lb', 36)}
      ${renderButtonIcon('xb_lb', 36)}
    </div>
  </div>

  <!-- PC Console Showcase Card -->
  <div class="cheat-card" style="border:1.5px solid rgba(255,122,61,0.4);background:linear-gradient(180deg, #22161E 0%, #140E13 100%);">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:12px;color:#FF7A3D;">
        ${pcLogoSvg}
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:1px;color:#FFFFFF;">PC CONSOLE & PHONE DIAL</span>
      </div>
      <span style="font-size:15px;font-weight:800;color:#FF7A3D;background:rgba(255,122,61,0.18);padding:4px 12px;border-radius:10px;">KEYWORD & CELL</span>
    </div>
    <div style="display:flex;gap:16px;margin-top:6px;">
      <div style="flex:1;background:#0E0B1A;padding:16px;border-radius:16px;border:1px solid rgba(255,122,61,0.3);text-align:center;">
        <div style="font-size:13px;color:#8C86A8;font-weight:700;margin-bottom:6px;">CONSOLE KEYWORD</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:800;color:#FF7A3D;">TOOLUP</div>
      </div>
      <div style="flex:1;background:#0E0B1A;padding:16px;border-radius:16px;border:1px solid rgba(44,229,224,0.3);text-align:center;">
        <div style="font-size:13px;color:#8C86A8;font-weight:700;margin-bottom:6px;">IN-GAME CELL PHONE</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:800;color:#2CE5E0;">1-999-866-587</div>
      </div>
    </div>
  </div>
`;

// ----------------------------------------------------------------------------
// Screen 3: Categories & Fast Browsing
// ----------------------------------------------------------------------------
const screen3Html = `
  <div style="padding:32px 32px 20px 32px;">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:2px;color:#FF4FA3;">ORGANIZED DIRECTORY</div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:46px;font-weight:900;letter-spacing:1px;color:#FFFFFF;">BROWSE CATEGORIES</div>
    <div style="font-size:18px;color:#8C86A8;margin-top:4px;">Target exactly what you need with instant category sorting</div>
  </div>

  <div style="padding:0 32px;display:flex;flex-direction:column;gap:18px;">
    <!-- Category 1: Vehicles -->
    <div style="position:relative;height:170px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 30px rgba(0,0,0,0.5);">
      <img src="${convertibleSkyline}" style="width:100%;height:100%;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(11,9,20,0.95) 0%, rgba(11,9,20,0.4) 60%, transparent 100%);"></div>
      <div style="position:absolute;top:28px;left:28px;">
        <span style="font-size:13px;font-weight:800;letter-spacing:1px;color:#FFD700;background:rgba(255,215,0,0.18);padding:4px 10px;border-radius:8px;">10 CODES</span>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:900;letter-spacing:1px;margin-top:6px;color:#FFFFFF;">VEHICLES & SPAWNS</div>
        <div style="font-size:16px;color:#B5B0D6;">Sports cars, choppers, bikes, planes & stunt craft</div>
      </div>
    </div>

    <!-- Category 2: Combat & Weapons -->
    <div style="position:relative;height:170px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 30px rgba(0,0,0,0.5);">
      <img src="${collageCover}" style="width:100%;height:100%;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(11,9,20,0.95) 0%, rgba(11,9,20,0.4) 60%, transparent 100%);"></div>
      <div style="position:absolute;top:28px;left:28px;">
        <span style="font-size:13px;font-weight:800;letter-spacing:1px;color:#FF4FA3;background:rgba(255,79,163,0.18);padding:4px 10px;border-radius:8px;">6 CODES</span>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:900;letter-spacing:1px;margin-top:6px;color:#FFFFFF;">COMBAT & WEAPONS</div>
        <div style="font-size:16px;color:#B5B0D6;">Explosive rounds, flaming bullets & weapon tiers</div>
      </div>
    </div>

    <!-- Category 3: Player & Abilities -->
    <div style="position:relative;height:170px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 30px rgba(0,0,0,0.5);">
      <img src="${bayJetskis}" style="width:100%;height:100%;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(11,9,20,0.95) 0%, rgba(11,9,20,0.4) 60%, transparent 100%);"></div>
      <div style="position:absolute;top:28px;left:28px;">
        <span style="font-size:13px;font-weight:800;letter-spacing:1px;color:#2CE5E0;background:rgba(44,229,224,0.18);padding:4px 10px;border-radius:8px;">6 CODES</span>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:900;letter-spacing:1px;margin-top:6px;color:#FFFFFF;">PLAYER & ABILITIES</div>
        <div style="font-size:16px;color:#B5B0D6;">Invincibility, super jump, fast run & skyfall</div>
      </div>
    </div>

    <!-- Category 4: World & Weather -->
    <div style="position:relative;height:170px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 30px rgba(0,0,0,0.5);">
      <img src="${streetDuo}" style="width:100%;height:100%;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(11,9,20,0.95) 0%, rgba(11,9,20,0.4) 60%, transparent 100%);"></div>
      <div style="position:absolute;top:28px;left:28px;">
        <span style="font-size:13px;font-weight:800;letter-spacing:1px;color:#9B5CFF;background:rgba(155,92,255,0.18);padding:4px 10px;border-radius:8px;">5 CODES</span>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:900;letter-spacing:1px;margin-top:6px;color:#FFFFFF;">WORLD & WEATHER</div>
        <div style="font-size:16px;color:#B5B0D6;">Change weather, moon gravity & drift physics</div>
      </div>
    </div>
  </div>
`;

// ----------------------------------------------------------------------------
// Screen 4: Instant Mid-Game Search
// ----------------------------------------------------------------------------
const screen4Html = `
  <div style="padding:32px 32px 16px 32px;">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:2px;color:#2CE5E0;">SEARCH & FILTER</div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:46px;font-weight:900;letter-spacing:1px;color:#FFFFFF;">REAL-TIME LOOKUP</div>
    <div style="font-size:18px;color:#8C86A8;margin-top:4px;">100% offline index with sub-millisecond filtering</div>
  </div>

  <!-- Active Search Input with Query -->
  <div style="margin:0 32px 18px 32px;height:62px;background:#171329;border:2px solid #2CE5E0;border-radius:20px;display:flex;align-items:center;padding:0 22px;gap:14px;color:#FFFFFF;font-size:22px;font-weight:600;box-shadow:0 0 24px rgba(44,229,224,0.35);">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CE5E0" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    <span style="color:#FFFFFF;">spawn</span>
    <span style="color:#2CE5E0;animation:blink 1s infinite;">|</span>
    <div style="margin-left:auto;background:rgba(44,229,224,0.2);color:#2CE5E0;font-size:14px;font-weight:800;padding:4px 10px;border-radius:8px;">8 MATCHES</div>
  </div>

  <!-- Platform selector -->
  <div class="platform-tabs" style="padding-top:0;">
    <div class="tab-pill active">${psLogoSvg} PlayStation</div>
    <div class="tab-pill">${xbLogoSvg} Xbox</div>
    <div class="tab-pill">${pcLogoSvg} PC</div>
  </div>

  <!-- Filtered Cheats -->
  <div class="cheat-card" style="border-left:4px solid #FFD700;">
    <div class="card-top">
      <div class="card-badge" style="background:rgba(255,215,0,0.15);color:#FFD700;border:1px solid rgba(255,215,0,0.3);">VEHICLES</div>
      <div class="pc-chip" style="color:#FFD700;border-color:rgba(255,215,0,0.3);background:rgba(255,215,0,0.1);">COMET</div>
    </div>
    <div class="card-title"><span style="color:#2CE5E0;">Spawn</span> Comet (Sports Car)</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_r1')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_r2')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l2')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_square')}
      ${renderButtonIcon('ps_r1')}
    </div>
  </div>

  <div class="cheat-card" style="border-left:4px solid #FF7A3D;">
    <div class="card-top">
      <div class="card-badge" style="background:rgba(255,122,61,0.15);color:#FF7A3D;border:1px solid rgba(255,122,61,0.3);">VEHICLES</div>
      <div class="pc-chip" style="color:#FF7A3D;border-color:rgba(255,122,61,0.3);background:rgba(255,122,61,0.1);">OFFROAD</div>
    </div>
    <div class="card-title"><span style="color:#2CE5E0;">Spawn</span> Sanchez (Dirt Bike)</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_r1')}
      ${renderButtonIcon('ps_r2')}
      ${renderButtonIcon('ps_l2')}
    </div>
  </div>

  <div class="cheat-card" style="border-left:4px solid #2CE5E0;">
    <div class="card-top">
      <div class="card-badge" style="background:rgba(44,229,224,0.15);color:#2CE5E0;border:1px solid rgba(44,229,224,0.3);">VEHICLES</div>
      <div class="pc-chip">BUZZOFF</div>
    </div>
    <div class="card-title"><span style="color:#2CE5E0;">Spawn</span> Buzzard Attack Chopper</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l2')}
      ${renderButtonIcon('ps_r1')}
      ${renderButtonIcon('ps_triangle')}
    </div>
  </div>
`;

// ----------------------------------------------------------------------------
// Screen 5: Saved Favorites & Quick Access
// ----------------------------------------------------------------------------
const screen5Html = `
  <div style="padding:32px 32px 16px 32px;">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:2px;color:#FF4FA3;">GAMEPLAY PINBOARD</div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:46px;font-weight:900;letter-spacing:1px;color:#FFFFFF;">FAVORITES</div>
      <span style="font-size:16px;font-weight:800;color:#FF4FA3;background:rgba(255,79,163,0.15);border:1px solid rgba(255,79,163,0.3);padding:6px 14px;border-radius:12px;">★ 4 SAVED</span>
    </div>
    <div style="font-size:18px;color:#8C86A8;margin-top:4px;">Quick one-tap access to your go-to cheats during missions</div>
  </div>

  <!-- Platform selector -->
  <div class="platform-tabs" style="padding-top:0;">
    <div class="tab-pill active">${psLogoSvg} PlayStation</div>
    <div class="tab-pill">${xbLogoSvg} Xbox</div>
    <div class="tab-pill">${pcLogoSvg} PC</div>
  </div>

  <!-- Favorite 1: Invincibility -->
  <div class="cheat-card" style="border:1.5px solid #FF4FA3;box-shadow:0 0 25px rgba(255,79,163,0.3);">
    <div class="card-top">
      <div style="display:flex;align-items:center;gap:10px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF4FA3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span class="card-badge" style="background:rgba(255,79,163,0.18);color:#FF4FA3;">PLAYER</span>
      </div>
      <div class="pc-chip" style="color:#FF4FA3;border-color:rgba(255,79,163,0.3);background:rgba(255,79,163,0.1);">PAINKILLER</div>
    </div>
    <div class="card-title">Invincibility (5 Minutes)</div>
    <div class="combo-row">
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('dpad_left')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_r1')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('dpad_left')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_triangle')}
    </div>
  </div>

  <!-- Favorite 2: Max Health & Armor -->
  <div class="cheat-card" style="border:1.5px solid #2CE5E0;box-shadow:0 0 25px rgba(44,229,224,0.25);">
    <div class="card-top">
      <div style="display:flex;align-items:center;gap:10px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2CE5E0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span class="card-badge" style="background:rgba(44,229,224,0.18);color:#2CE5E0;">COMBAT</span>
      </div>
      <div class="pc-chip">TURTLE</div>
    </div>
    <div class="card-title">Max Health & Armor</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_triangle')}
      ${renderButtonIcon('ps_r2')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('ps_square')}
      ${renderButtonIcon('ps_circle')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_square')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l1')}
    </div>
  </div>

  <!-- Favorite 3: Give Weapons -->
  <div class="cheat-card" style="border-left:4px solid #FF7A3D;">
    <div class="card-top">
      <div style="display:flex;align-items:center;gap:10px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF7A3D"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span class="card-badge" style="background:rgba(255,122,61,0.18);color:#FF7A3D;">COMBAT</span>
      </div>
      <div class="pc-chip" style="color:#FF7A3D;border-color:rgba(255,122,61,0.3);background:rgba(255,122,61,0.1);">TOOLUP</div>
    </div>
    <div class="card-title">Give Weapons & Ammo</div>
    <div class="combo-row">
      ${renderButtonIcon('ps_triangle')}
      ${renderButtonIcon('ps_r2')}
      ${renderButtonIcon('dpad_left')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_x')}
      ${renderButtonIcon('dpad_right')}
      ${renderButtonIcon('ps_triangle')}
      ${renderButtonIcon('dpad_down')}
      ${renderButtonIcon('ps_square')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l1')}
      ${renderButtonIcon('ps_l1')}
    </div>
  </div>
`;

// ----------------------------------------------------------------------------
// Screen 6: Detailed Cheat Breakdown & Safety Warnings
// ----------------------------------------------------------------------------
const screen6Html = `
  <!-- Top navigation bar -->
  <div style="padding:24px 32px 14px 32px;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:12px;color:#2CE5E0;font-size:18px;font-weight:700;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      <span>BACK</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:13px;font-weight:800;letter-spacing:1px;color:#FF4FA3;background:rgba(255,79,163,0.18);padding:4px 10px;border-radius:8px;">PLAYER & ABILITIES</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF4FA3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    </div>
  </div>

  <div style="padding:0 32px;">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:900;letter-spacing:1px;color:#FFFFFF;line-height:1.05;">INVINCIBILITY (GOD MODE)</div>
    <div style="font-size:18px;color:#B5B0D6;margin-top:10px;line-height:1.45;">
      Grants complete invulnerability to bullets, explosions, fire, and falling for exactly 5 minutes.
    </div>

    <!-- Platform Picker for Details -->
    <div class="platform-tabs" style="padding:16px 0;background:transparent;">
      <div class="tab-pill active">${psLogoSvg} PlayStation</div>
      <div class="tab-pill">${xbLogoSvg} Xbox</div>
      <div class="tab-pill">${pcLogoSvg} PC</div>
    </div>

    <!-- Large Controller Sequence -->
    <div style="background:#171329;border:1.5px solid rgba(255,79,163,0.4);border-radius:24px;padding:24px;box-shadow:0 8px 30px rgba(0,0,0,0.5);">
      <div style="font-size:14px;font-weight:800;letter-spacing:1.5px;color:#2CE5E0;text-transform:uppercase;margin-bottom:14px;">CONTROLLER BUTTON SEQUENCE</div>
      <div class="combo-row" style="background:#0E0B1A;padding:18px;gap:12px;border:1px solid rgba(255,255,255,0.06);">
        ${renderButtonIcon('dpad_right', 40)}
        ${renderButtonIcon('ps_x', 40)}
        ${renderButtonIcon('dpad_right', 40)}
        ${renderButtonIcon('dpad_left', 40)}
        ${renderButtonIcon('dpad_right', 40)}
        ${renderButtonIcon('ps_r1', 40)}
        ${renderButtonIcon('dpad_right', 40)}
        ${renderButtonIcon('dpad_left', 40)}
        ${renderButtonIcon('ps_x', 40)}
        ${renderButtonIcon('ps_triangle', 40)}
      </div>
    </div>

    <!-- PC & Dial Row -->
    <div style="display:flex;gap:14px;margin-top:16px;">
      <div style="flex:1;background:#171329;border:1px solid rgba(44,229,224,0.3);border-radius:18px;padding:16px;">
        <div style="font-size:12px;color:#8C86A8;font-weight:700;">PC KEYWORD</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:800;color:#2CE5E0;margin-top:4px;">PAINKILLER</div>
      </div>
      <div style="flex:1;background:#171329;border:1px solid rgba(255,122,61,0.3);border-radius:18px;padding:16px;">
        <div style="font-size:12px;color:#8C86A8;font-weight:700;">CELL PHONE CODE</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:19px;font-weight:800;color:#FF7A3D;margin-top:4px;">1-999-724-654-5537</div>
      </div>
    </div>

    <!-- Trophy Safety Warning Box -->
    <div style="margin-top:18px;background:rgba(255,79,163,0.08);border:1px solid rgba(255,79,163,0.3);border-radius:20px;padding:20px;display:flex;gap:16px;align-items:flex-start;">
      <div style="color:#FF4FA3;font-size:26px;line-height:1;">⚠️</div>
      <div>
        <div style="font-size:17px;font-weight:800;color:#FF4FA3;letter-spacing:0.5px;">TROPHY & ACHIEVEMENT SAFETY</div>
        <div style="font-size:15px;color:#B5B0D6;margin-top:6px;line-height:1.4;">
          Entering this cheat temporarily disables Trophies and Achievements for the current play session. Save your game before activating!
        </div>
      </div>
    </div>
  </div>
`;

// Screenshot Configurations
const SCREENSHOTS = [
  {
    filename: '01_all_cheats_1242x2688.png',
    badge: 'ULTIMATE COMPANION',
    headline: 'ALL CHEAT CODES AT YOUR COMMAND',
    subtitle: 'Instant controller combos and console keywords for PlayStation, Xbox & PC.',
    activeTab: 'all',
    gradientTheme: 'pink',
    innerScreenHtml: screen1Html,
  },
  {
    filename: '02_gamepad_combos_1242x2688.png',
    badge: 'CROSS-PLATFORM PRECISION',
    headline: 'AUTHENTIC GAMEPAD SEQUENCES',
    subtitle: 'High-res PlayStation button icons, Xbox triggers & PC console codes.',
    activeTab: 'all',
    gradientTheme: 'cyan',
    innerScreenHtml: screen2Html,
  },
  {
    filename: '03_categories_1242x2688.png',
    badge: 'ORGANIZED DIRECTORY',
    headline: 'EXPLORE BY CATEGORY',
    subtitle: 'Vehicles & Spawns, Combat & Weapons, World & Weather, and Player Abilities.',
    activeTab: 'categories',
    gradientTheme: 'orange',
    innerScreenHtml: screen3Html,
  },
  {
    filename: '04_instant_search_1242x2688.png',
    badge: 'REAL-TIME FILTERING',
    headline: 'LIGHTNING-FAST SEARCH',
    subtitle: 'Search any weapon, sports car, chopper, or effect mid-game with zero lag.',
    activeTab: 'all',
    gradientTheme: 'cyan',
    innerScreenHtml: screen4Html,
  },
  {
    filename: '05_favorites_1242x2688.png',
    badge: 'GAMEPLAY READY',
    headline: 'ONE-TAP FAVORITES',
    subtitle: 'Pin your go-to cheats for instant lookup during intense missions.',
    activeTab: 'favorites',
    gradientTheme: 'pink',
    innerScreenHtml: screen5Html,
  },
  {
    filename: '06_cheat_details_1242x2688.png',
    badge: 'DEEP BREAKDOWN',
    headline: 'FULL CHEAT DETAILS & TIPS',
    subtitle: 'Step-by-step combo sequences, duration timers & trophy safety warnings.',
    activeTab: 'all',
    gradientTheme: 'purple',
    innerScreenHtml: screen6Html,
  },
];

console.log('Generating 6 App Store screenshots (1242 x 2688)...');

SCREENSHOTS.forEach((item, index) => {
  const htmlContent = renderHtmlTemplate(item);
  const tempHtmlPath = path.resolve(OUTPUT_DIR, `temp_${index + 1}.html`);
  const outPngPath = path.resolve(OUTPUT_DIR, item.filename);

  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  console.log(`Rendering [${index + 1}/6]: ${item.filename}...`);
  execFileSync(EDGE_PATH, [
    '--headless',
    '--disable-gpu',
    `--screenshot=${outPngPath}`,
    '--window-size=1242,2688',
    '--hide-scrollbars',
    tempHtmlPath,
  ]);

  fs.unlinkSync(tempHtmlPath);

  const stats = fs.statSync(outPngPath);
  console.log(`✓ Rendered: ${item.filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
});

console.log('All 6 App Store screenshots successfully generated in screenshots/!');
