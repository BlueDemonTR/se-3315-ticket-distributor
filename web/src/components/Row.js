import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${props => props.marg && props.marg};
  gap: ${props => props.gap && props.gap};
  padding: ${props => props.pad && props.pad};
  justify-content: ${props => props.between ? 'space-between' : props.evenly ? 'space-evenly' : props.start ? 'flex-start' : 'inherit'};
  ${props => props.alignStart && 'align-self: flex-start'};
  border-radius: ${props => props.hasRadius && props.hasRadius};
  background-color: ${props => props.bg || 'transparent'};
  align-items: ${props => props.center ? 'center' : (props.end ? 'flex-end' : 'flex-start')};
  border: ${props => props.border && '0.1px solid #ddd'};
  max-width: ${props => props.maxWid && props.maxWid};
  min-width: ${props => props.minWid && props.minWid};
  flex-wrap: ${props => props.wrapFlex ? 'wrap' : 'inherit'};
  height: ${props => props.ht || 'auto'};
  width: ${props => props.wid || 'auto'};
  position: ${props => props.pos || 'unset'};
  ${props => props.scrollY && `overflow-y: scroll;`};
  ${props => props.scrollX && `overflow-x: scroll;`};
  ${props => props.zIndex && `z-index: ${props.zIndex};`};

  ${props => props.hasBorder && `border: ${props.hasBorder};`}
  ${props => props.borderBottom && `border-bottom: ${props.borderBottom};`}
  ${props => props.borderTop && `border-top: ${props.borderTop}`}

  ${props => props.centerAll && `
    align-items: center;
    justify-content: center;
  `};

  ${props => props.pointer && css`
    cursor: pointer;

    p {
      cursor: pointer
    }
  `};

  ${props => props.top && `top: ${props.top};`};
  ${props => props.left && `left: ${props.left};`};
  ${props => props.right && `right: ${props.right};`};
  ${props => props.bottom && `bottom: ${props.bottom};`};

  ${props => props.shadow && `box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);`}

  ${props => props.hasFlex && css`flex: 1`};

  ${props => props.reverse && css`flex-direction: row-reverse`};

  ${props => props.hasFade &&
    css`
      animation: ${fadeIn} 0.3s linear;
    `
  }

  ${props => props.individualRadius && `
    border-top-left-radius: ${props.individualRadius[0]};
    border-top-right-radius: ${props.individualRadius[1]};
    border-bottom-right-radius: ${props.individualRadius[2]};
    border-bottom-left-radius: ${props.individualRadius[3]};
  `}

  ${props => props.hideScrollBar && `
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  `}

  ${props => props.scrollX && `
    overflow-x: scroll;
  `}
`

export default Row
