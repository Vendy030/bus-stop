const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// 中間件
app.use(cors());
app.use(bodyParser.json());

// 固定站牌順序
const busStops5089 = [
  "中壢總站", "中央新生路口", "新生路口", "中美路口", "SOGO百貨（新生路）", "環北路口",
  "變電所", "公坡", "興南國中", "興南", "六和紡織", "六和機械", "聖德基督學院", "水圳頭",
  "水尾", "新宙", "福安宮", "頂青埔", "青埔社區", "廣天寺", "青埔國小", "中厝", "高鐵桃園站",
  "青昇二街口", "大園國際高中", "大成大智路口", "三陽公司", "慶皇公司", "頂橫山", "李厝",
  "青埔花墅", "大坡腳", "下大坡腳", "上湳子", "湳子", "尖山", "頂南門", "南門", "大園車站",
  "大園農會", "橫峰", "橫山橋", "桃園機場第一航廈", "桃園機場第二航廈"
];

// 已選擇站牌和行駛方向
let selectedStops = [];
let direction = "去程"; // 初始方向

// 根據固定順序排序，按方向調整顯示順序
function sortStops(stops) {
  const sortedStops = stops.sort((a, b) => busStops5089.indexOf(a) - busStops5089.indexOf(b));
  return direction === "去程" ? sortedStops : sortedStops.reverse();
}

// 取得所有選擇的站牌（已排序）和行駛方向
app.get('/stops', (req, res) => {
  const sortedStops = sortStops([...selectedStops]);
  res.json({ stops: sortedStops, direction });
});

// 新增下車站牌
app.post('/stops', (req, res) => {
  const { stop } = req.body;
  if (stop && busStops5089.includes(stop) && !selectedStops.includes(stop)) {
    selectedStops.push(stop);
    const sortedStops = sortStops([...selectedStops]);
    res.status(201).json({ message: 'Stop added', stops: sortedStops, direction });
  } else {
    res.status(400).json({ message: 'Invalid or duplicate stop' });
  }
});

// 刪除已經停靠的站牌
app.delete('/stops', (req, res) => {
  const { stop } = req.body;
  selectedStops = selectedStops.filter(s => s !== stop);
  const sortedStops = sortStops([...selectedStops]);
  res.status(200).json({ message: 'Stop removed', stops: sortedStops, direction });
});

// 切換行駛方向
app.post('/direction', (req, res) => {
  direction = direction === "去程" ? "返程" : "去程";
  const sortedStops = sortStops([...selectedStops]);
  res.json({ message: 'Direction updated', direction, stops: sortedStops });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
