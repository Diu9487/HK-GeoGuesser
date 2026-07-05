// 1. 地點資料庫
const locations = [
    { id: '312157127015193', lat: 22.2060828, lng: 114.0314316, name: "長洲" },
    { id: '285205046611365', lat: 22.279163, lng: 114.1808013, name: "灣仔" },
    { id: '4084827981537859', lat: 22.2870403, lng: 114.1592062, name: "中環" }
];

// 2. 初始化變數
let currentLoc = locations[0];

// 3. 初始化 Mapillary
const mly = new mapillary.Viewer({
    accessToken: 'MLY|27626819467009313|5f660b12626c0346d620b04a689ce95e', 
    container: 'mly',
    imageId: currentLoc.id
});

// 4. 初始化 Leaflet 地圖
const map = L.map('map').setView([22.3193, 114.1694], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 5. 距離計算公式
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI/180);
    const dLon = (lon2 - lon1) * (Math.PI/180);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// 6. 切換地點功能
function nextLocation() {
    const randomIndex = Math.floor(Math.random() * locations.length);
    currentLoc = locations[randomIndex];
    mly.moveTo(currentLoc.id);
    map.eachLayer((layer) => { if (layer instanceof L.Marker) map.removeLayer(layer); });
}

// 7. 點擊地圖猜測
map.on('click', function(e) {
    const userLat = e.latlng.lat;
    const userLng = e.latlng.lng;
    const distance = getDistanceFromLatLonInKm(currentLoc.lat, currentLoc.lng, userLat, userLng);
    
    // 玩家猜測標記
    L.marker([userLat, userLng]).addTo(map).bindPopup("你的猜測").openPopup();
    
    // 正確位置標記 (綠色)
    L.marker([currentLoc.lat, currentLoc.lng], {
        icon: L.icon({ 
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', 
            iconSize: [25, 41] 
        })
    }).addTo(map).bindPopup("正確位置: " + currentLoc.name).openPopup();
    
    alert("距離目標: " + distance.toFixed(2) + " 公里");
});
