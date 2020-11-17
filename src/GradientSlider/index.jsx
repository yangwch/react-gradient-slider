import React from 'react';
import styled from 'styled-components';
import styles from './index.less';
import OperateButtons from './OperateButtons';
import Slider from './Slider';

const Wrapper = styled.div``;

const ButtonsWrapper = styled.div``;

function GradientSlider(props) {
  const {
    colors,
    onAddColor,
    onRemoveColor,
    onSliderMouseDown,
    activeButtonIndex,
    onSelectColor,
    buttons,
  } = props;
  const defaultButtons = <OperateButtons onAdd={onAddColor} onRemove={onRemoveColor} />;
  let opButtons = defaultButtons;
  if (buttons && buttons instanceof Function) {
    opButtons = buttons({ onAddColor, onRemoveColor });
  }
  return (
    <Wrapper className={styles.gradientSlider}>
      <ButtonsWrapper className={styles.operateButtons}>
        {opButtons}
      </ButtonsWrapper>
      <Slider
        colors={colors}
        onSliderMouseDown={onSliderMouseDown}
        activeIndex={activeButtonIndex}
        onSelectColor={onSelectColor}
      ></Slider>
    </Wrapper>
  );
}

export default GradientSlider;
