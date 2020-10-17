const REGION_DATA = require("./data.json");

// code转汉字大对象
const CodeToText = {};
const provinceObject = REGION_DATA["86"]; // 省份对象
const regionData = [];

// 计算省
for (const prop in provinceObject) {
  regionData.push({
    value: prop, // 省份code值
    label: provinceObject[prop] // 省份汉字
  });
  CodeToText[prop] = provinceObject[prop];
}
// 计算市
for (let i = 0, len = regionData.length; i < len; i++) {
  const provinceCode = regionData[i].value;
  const provinceChildren = [];
  for (const prop in REGION_DATA[provinceCode]) {
    provinceChildren.push({
      value: prop,
      label: REGION_DATA[provinceCode][prop]
    });
    CodeToText[prop] = REGION_DATA[provinceCode][prop];
  }
  regionData[i].children = provinceChildren;
}

let citydata = regionData;
export { citydata, CodeToText };
