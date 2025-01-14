// 動態生成站牌選項
const busStops5089 = [
  "中壢總站", "中央新生路口", "新生路口", "中美路口", "SOGO百貨（新生路）", "環北路口",
  "變電所", "公坡", "興南國中", "興南", "六和紡織", "六和機械", "聖德基督學院", "水圳頭",
  "水尾", "新宙", "福安宮", "頂青埔", "青埔社區", "廣天寺", "青埔國小", "中厝", "高鐵桃園站",
  "青昇二街口", "大園國際高中", "大成大智路口", "三陽公司", "慶皇公司", "頂橫山", "李厝",
  "青埔花墅", "大坡腳", "下大坡腳", "上湳子", "湳子", "尖山", "頂南門", "南門", "大園車站",
  "大園農會", "橫峰", "橫山橋", "桃園機場第一航廈", "桃園機場第二航廈"
];

const busStopSelect = document.getElementById('busStops');
busStops5089.forEach(stop => {
  const option = document.createElement('option');
  option.value = stop;
  option.textContent = stop;
  busStopSelect.appendChild(option);
});

// 表單提交事件處理
document.getElementById('busStopForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const selectedStop = busStopSelect.value;
  document.getElementById('selectedStop').textContent = `您選擇的站點: ${selectedStop}`;

  // 禁用下拉選單，防止重複選擇
  busStopSelect.disabled = true;

  // 發送選擇的站點到伺服器
  try {
    const response = await fetch('http://localhost:3000/stops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stop: selectedStop }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('伺服器回應:', result);
    } else {
      console.error('伺服器錯誤:', response.status);
    }
  } catch (error) {
    console.error('無法連接到伺服器:', error);
  }
});
