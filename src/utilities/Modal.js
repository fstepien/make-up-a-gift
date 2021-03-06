import React, { Component } from "react";
import Portal from "./Portal";
import styled from "styled-components";
import Icon from "./Icon";

export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalCard>
              <CloseBtn onClick={toggle}>
                <Icon name="close" />
              </CloseBtn>
              <div>{children}</div>
            </ModalCard>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  position: fixed;
`;

const ModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 50%;
  transition: width ease 1s;
  background: white;
  padding: 20px;
  border-radius: 2px;
  z-index: 10;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
  @media (max-width: 700px) {
    width: 90%;
  }
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  padding: 10px;
  cursor: pointer;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/assets/trianglify.svg");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.8;
  /* background: rgba(255, 236, 218, 0.75); */
`;
