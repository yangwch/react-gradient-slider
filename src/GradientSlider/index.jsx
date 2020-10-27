import React from 'react';
import styled from 'styled-components';
import { getGradientCenterColor } from './color';
import styles from './index.less';
import OperateButtons from './OperateButtons';
import Slider from './Slider';

const Wrapper = styled.div``;

const ButtonsWrapper = styled.div``;

function GradientSlider(props) {
  const { defaultValue = [], onChange } = props;
  const [tmpColors, setTmpColors] = React.useState(defaultValue);
  const [activeButtonIndex, setActiveButtonIndex] = React.useState(0);

  // 添加颜色
  const addColor = () => {
    const newColors = Array.from(tmpColors);
    const index = Math.min(Math.max(0, activeButtonIndex), newColors.length - 2);
    const start = newColors[index];
    const end = newColors[index + 1];
    if (!start || !end || start.position === end.position) return;

    const startColor = start.color;
    const endColor = end.color;
    newColors.splice(index + 1, 0, {
      opacity: 1,
      color: getGradientCenterColor(startColor, endColor),
      position: start.position + (end.position - start.position) / 2,
    });
    onChange(newColors);
    setActiveButtonIndex(index + 1);
  };

  // 移除一个颜色
  const removeColor = () => {
    if (
      defaultValue.length > 2 &&
      activeButtonIndex > 0 &&
      activeButtonIndex < defaultValue.length - 1
    ) {
      const newColors = Array.from(defaultValue);
      newColors.splice(activeButtonIndex, 1);
      onChange(newColors);
      setActiveButtonIndex(activeButtonIndex - 1);
    }
  };

  // 更改颜色
  const onSelectColor = (color, index) => {
    const newColors = Array.from(defaultValue);
    newColors.splice(index, 1, {
      ...newColors[index],
      color: color && color.hex,
    });
    onChange(newColors);
  };

  React.useEffect(() => {
    setTmpColors(defaultValue);
    if (activeButtonIndex > defaultValue.length - 1) {
      setActiveButtonIndex(defaultValue.length - 1);
    }
  }, [defaultValue]);

  const getMovedColors = (startPosition, sliderWidth, index, e) => {
    const { clientX: ex, clientY: ey } = e;
    const { clientX: sx } = startPosition;
    const mx = Math.round(((ex - sx) / sliderWidth) * 100);

    const newColors = Array.from(tmpColors);
    const item = defaultValue[index];
    if (!item) return null;
    const position = Math.min(100, Math.max(0, item.position + mx));
    newColors.splice(index, 1, {
      ...item,
      position,
    });
    console.log('mousemove', { ex, ey, position });
    return newColors.sort((a, b) => a.position - b.position);
  };

  let onmove = null;
  let onup = null;

  const onMousemove = (startPosition, sliderWidth, index, e) => {
    if (!startPosition || !sliderWidth) return;
    const newColors = getMovedColors(startPosition, sliderWidth, index, e);
    setTmpColors(newColors);
  };

  // 抬起
  const onMouseup = (startPosition, sliderWidth, index, e) => {
    document.removeEventListener('mousemove', onmove);
    document.removeEventListener('mouseup', onup);

    const { clientX, clientY } = e;
    const colors = getMovedColors(startPosition, sliderWidth, index, e);
    console.log('mouseup', { clientX, clientY, colors });
    onChange(colors);
  };

  // 拖动
  const listenMousemove = () => {
    document.addEventListener('mousemove', onmove);
    document.addEventListener('mouseup', onup);
  };

  // 按下滑块
  const onSliderMouseDown = (e, data, width) => {
    e.preventDefault();

    const { item, index, isFirstOrLast } = data;
    setActiveButtonIndex(index);
    if (!item || isFirstOrLast) {
      return;
    }
    const { clientX, clientY } = e;
    const startPosition = { clientX, clientY };
    console.log({ clientX, clientY });
    onmove = onMousemove.bind(this, startPosition, width, index);
    onup = onMouseup.bind(this, startPosition, width, index);
    listenMousemove();
  };

  return (
    <Wrapper className={styles.gradientSlider}>
      <ButtonsWrapper className={styles.operateButtons}>
        <OperateButtons onAdd={addColor} onRemove={removeColor} />
      </ButtonsWrapper>
      <Slider
        colors={tmpColors}
        onSliderMouseDown={onSliderMouseDown}
        activeIndex={activeButtonIndex}
        onSelectColor={onSelectColor}
      ></Slider>
    </Wrapper>
  );
}

export default GradientSlider;
