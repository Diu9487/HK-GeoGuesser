// 1. 設定你的地點資料庫
const locations = [
    { id: '312157127015193', lat: 22.2060828, lng: 114.0314316, name: "長洲" },
    { id: '285205046611365', lat: 22.279163, lng: 114.1808013, name: "灣仔" },
    { id: '4084827981537859', lat: 22.2870403, lng: 114.1592062, name: "中環" }
];

// 2. 初始化 Mapillary 檢視器
const mly = new mapillary.Viewer({
    accessToken: 'MLY|27626819467009313|5f660b12626c0346d620b04a689ce95e',
    container: 'mly',
    imageId: locations[0].id // 預設顯示第一個地點
});

// 3. 初始化 Leaflet 地圖
const map = L.map('map').setView([22.3193, 114.1694], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map).addTo(map);

// 4. 隨機切換地點的函數
function nextLocation() {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const loc = locations[randomIndex];
    
    // 更新 Mapillary 畫面
    mly.moveTo(loc.id);
    alert("現在的地點已經更換囉！");
}

// 5. 地圖點擊事件（玩家猜測）
map.on('click', function(e) {
    const userLat = e.latlng.lat;
    const userLng = e.latlng.lng;
    
    // 這裡簡單彈出視窗顯示玩家點擊的座標
    alert("你點擊了座標: " + userLat.toFixed(4) + ", " + userLng.toFixed(4));
    
    // 未來我們可以在這裡加入計算距離的邏輯
});
