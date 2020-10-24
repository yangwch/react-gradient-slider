const fmtColorLength = color => {
  let hexColor = color;
    // 三位颜色修改为6位
  if (hexColor.length === 4) {
    for (var i = 1; i < 4; i++) {
      const char = hexColor.slice(i, i + 1)
      hexColor += char.concat(char);
    }
  }
  return hexColor;
};

const trimAndParseInt = str => {
  try {
    if (typeof str === 'string') {
      let num = parseInt(str.replace(/\s/g, ''), 10);
      return Math.min(255, num);
    }
  } catch (ex) {
    return str;
  }
  return str;
}

const extractRGBFromArray = arr => {
  const rgbArr = Array.from(arr);
  const r = trimAndParseInt(rgbArr[0]);
  const g = trimAndParseInt(rgbArr[1]);
  const b = trimAndParseInt(rgbArr[2]);
  const a = trimAndParseInt(rgbArr[3]);
  return {
    r,
    g,
    b,
    ...(rgbArr.length === 4 ? { a } : {}),
  }
}

exports.color2RGB = color => {
  if (!color || typeof color !== 'string') return;

  // 检测rgb格式 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0)'
  const rgbPattern = /^RGB([A]{0,1})(\()(((\s{0,})[0-9]{1,3}(\s{0,})(,)){2,3})(\s{0,})([0-9]{1,3})(\s{0,})(\))$/i;
  if (rgbPattern.test(color)) {
    console.log('isRGB format', color);
    const rgbArr = color.replace(/(rgb([a]{0,1})(\())|(\))/gi, '').split(',');
    return extractRGBFromArray(rgbArr);
  }
  // 检测hex格式 '#fff' '#f3f3f3' '#f3f3f32F'
  const hexPattern = /^#([0-9a-fA-f]{3}|([0-9a-f]{6})|([0-9a-f]{8}))$/i;
  if (hexPattern.test(color)) {
    let hexColor = fmtColorLength(color);
    const rgbArr = [];
    for(let i = 1; i < hexColor.length; i+=2) {
      rgbArr.push(parseInt(`0x${hexColor.slice(i, i + 2)}`, 10));
    }
    return extractRGBFromArray(rgbArr);
  }
  return color;
}