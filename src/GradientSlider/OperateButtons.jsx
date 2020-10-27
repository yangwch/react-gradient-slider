import React from 'react';
import styled from 'styled-components';

const Button = styled.button``;


const OperateButtons = props => {
  const { onAdd, onRemove } = props;
  return (
    <>
      <Button type="default" onClick={onAdd}>+</Button> &nbsp;
      <Button type="default" onClick={onRemove}>-</Button>
    </>
  );
};

export default OperateButtons;
