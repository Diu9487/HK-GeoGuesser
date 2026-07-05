const mly = new mapillary.Viewer({
    accessToken: 'MLY|27626819467009313|5f660b12626c0346d620b04a689ce95e', // 貼上你的 Token
    container: 'mly',
    imageId: '455516448877595' // 先找一張香港 Mapillary 的照片 ID 填入
});

const map = L.map('map').setView([22.3193, 114.1694], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
