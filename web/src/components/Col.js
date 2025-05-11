import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Col = styled.div`
  flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
  display: flex;
  align-self: ${props => props.center ? 'center' : props.end ? 'flex-end' : 'flex-start'};
  margin: ${props => props.marg && props.marg};
  padding: ${props => props.pad && props.pad};
  gap: ${props => props.gap && props.gap};
  border-radius: ${props => props.hasRadius && props.hasRadius};
  background-color: ${props => props.bg && props.bg};
  align-items: ${props => props.centerAll ? 'center' : props.endHorizontal && 'flex-end'};
  ${props => props.border && `border: ${props.border}`};
  max-width: ${props => props.maxWid && props.maxWid};
  min-width: ${props => props.minWid && props.minWid};
  min-height: ${props => props.minHt && props.minHt};
  max-height: ${props => props.maxHt && props.maxHt};
  justify-content: ${props => props.between ? 'space-between' : props.evenly ? 'space-evenly' : props.start ? 'flex-start' : 'center'};
  height: ${ props => props.fullHt ? '100vh' : props.ht || 'auto'};
  width: ${props => props.wid || 'auto'};
  position: ${props => props.pos || 'unset'};
  ${props => props.scrollY && `overflow-y: auto`};
  ${props => props.thinScroll && `scrollbar-width: thin`};
  ${props => !props.noFlex && `flex: 1;`}
  ${props => props.zIndex && `z-index: ${props.zIndex};`};
  ${props => props.shadow && `box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);`};
  ${props => props.none && `display: none;`};

  ${props => props.top && `top: ${props.top};`};
  ${props => props.left && `left: ${props.left};`};
  ${props => props.right && `right: ${props.right};`};
  ${props => props.bottom && `bottom: ${props.bottom};`};

  ${props => props.hasBorder && `border: ${props.hasBorder}`}
  ${props => props.borderBottom && `border-bottom: ${props.borderBottom}`}
  ${props => props.borderTop && `border-top: ${props.borderTop}`}

  ${props => props.pointer && css`
    cursor: pointer;

    p {
      cursor: pointer
    }
  `};

  ${props => props.hasFade && css`
      animation: ${fadeIn} 0.3s linear;
  `};

  ${props => props.stretch && css`
    align-self: stretch;
  `};

  ${props => props.overflow && css`
    overflow: ${props.overflow};
  `};
`

export default Col
