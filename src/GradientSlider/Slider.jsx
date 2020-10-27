// import { Popover } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap_white.css';

const SliderWrapper = styled.div`
  position: relative;
`;

const SliderThumb = styled.div`
  width: 9px;
  height: 16px;
  background: ${props => props.color || 'none'};
  border: 2px solid #fff;
`;

const SliderThumbWrapper = styled.div`
  position: absolute;
  top: 1px;
  z-index: 0;
  width: 9px;
  height: 16px;
`;

const ColorItem = styled.div`
  width: 100%;
  height: 18px;
  border: 1px solid #f1f1f1;
  background: ${props => props.color};
  cursor: pointer;
`;

const formatLinearColors = (data = []) => {
  if (data.length < 2) {
    return 'none';
  }
  const nColor = data.map(item => `${item.color} ${item.position}%`);
  return `linear-gradient(90deg, ${nColor.join(', ')})`;
};

const SliderItem = props => {
  const { color, position, isFirstOrLast, isActive, onSelectColor, ...attrs } = props;
  const wrapperStyle = {
    left: `${position}%`,
    zIndex: isFirstOrLast ? 0 : 1,
  };
  if (position === 100) {
    wrapperStyle.transform = 'translate(-100%, 0)';
  } else if (position > 0) {
    wrapperStyle.transform = 'translate(-50%, 0)';
  }

  const sliderStyle = {
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
  };
  // 当前选中样式
  if (isActive) {
    sliderStyle.boxShadow = '0 0 2px 2px #4d90fe';
  }
  return (
    <SliderThumbWrapper style={wrapperStyle}>
      <Tooltip
        trigger="click"
        placement="bottomRight"
        overlayClassName="slider-popover-overlay"
        overlay={
          <SketchPicker color={color} width="240px" disableAlpha onChangeComplete={onSelectColor} />
        }
      >
        <SliderThumb color={color} style={sliderStyle} {...attrs} />
      </Tooltip>
    </SliderThumbWrapper>
  );
};

const Slider = props => {
  const { colors = [], onSliderMouseDown, activeIndex, onSelectColor } = props;
  const linearColor = formatLinearColors(colors);
  const containerRef = React.useRef(null);

  const getCotainerWidth = () => {
    const dom = containerRef && containerRef.current;
    return dom && dom.clientWidth;
  };

  const onChangeColor = (color, index) => {
    if (onSelectColor) {
      onSelectColor(color, index);
    }
  };

  // 点击在某个位置添加
  // const onClickColorbar = e => {
  //   const dom = containerRef && containerRef.current;
  //   const wrapperRects = dom && dom.getClientRects();
  //   if (wrapperRects && wrapperRects[0]) {
  //     const { left, width } = wrapperRects[0];
  //     const { clientX } = e;
  //     const percent = Math.round(((clientX - left) / width) * 100);
  //     console.log('addColorAtPosition', percent);
  //     if (addColorAtPosition) {
  //       addColorAtPosition(percent);
  //     }
  //   }
  // }

  const renderSliderItem = (c, i) => {
    const isFirstOrLast = i === 0 || i === colors.length - 1;

    return (
      <SliderItem
        key={`${c.color + c.position + i}`}
        color={c.color}
        position={c.position}
        isFirstOrLast={isFirstOrLast}
        isActive={i === activeIndex}
        onMouseDown={e =>
          onSliderMouseDown(
            e,
            {
              item: c,
              index: i,
              isFirstOrLast,
            },
            getCotainerWidth(),
          )
        }
        onSelectColor={color => onChangeColor(color, i)}
      />
    );
  };

  return (
    <SliderWrapper ref={containerRef}>
      <ColorItem /* onClick={onClickColorbar} */ color={linearColor}></ColorItem>
      {(colors || []).map(renderSliderItem)}
    </SliderWrapper>
  );
};

export default Slider;
