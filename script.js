// 1. 地點資料庫
const locations = [
    { id: '312157127015193', lat: 22.2060828, lng: 114.0314316, name: "長洲" },
    { id: '285205046611365', lat: 22.279163, lng: 114.1808013, name: "灣仔" },
    { id: '4084827981537859', lat: 22.2870403, lng: 114.1592062, name: "中環" }
];

// 2. 初始化 Mapillary
const mly = new mapillary.Viewer({
    accessToken: 'MLY|27626819467009313|5f660b12626c0346d620b04a689ce95e', 
    container: 'mly',
    imageId: locations[0].id
});

// 3. 初始化 Leaflet 地圖
const map = L.map('map').setView([22.3193, 114.1694], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 4. 切換地點功能
function nextLocation() {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const loc = locations[randomIndex];
    mly.moveTo(loc.id);
    // 隱藏舊的標記 (如果有)
    map.eachLayer((layer) => { if (layer instanceof L.Marker) map.removeLayer(layer); });
}

// 5. 點擊地圖猜測
map.on('click', function(e) {
    const userLat = e.latlng.lat;
    const userLng = e.latlng.lng;
    
    // 在地圖上放置一個標記
    L.marker([userLat, userLng]).addTo(map).bindPopup("你猜在這裡！").openPopup();
    
    alert("你點擊了座標: " + userLat.toFixed(4) + ", " + userLng.toFixed(4));
});
