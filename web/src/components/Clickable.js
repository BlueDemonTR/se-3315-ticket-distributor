import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledClickable = styled.div`
  cursor: pointer;
  margin: ${props => props.marg ? props.marg : '0'};
  ${props => props.zIndex && `z-index:  ${props.zIndex}`};

  ${props => !props.disabled ?  `
    &:active {
      opacity: 0.6;
    }
  ` : !props.ogOpacity && `
    opacity: 0.6;
  `}
  height: ${props => props.ht || 'unset'};
  width: ${props => props.wid || 'unset'};
`

const Clickable = ({
  children,
  onClick = () => null,
  onHover = () => null,
  marg,
  zIndex,
  goThrough,
  disabled,
  ogOpacity,
  wid,
  ht,
  action
}) => {
  const loadingButton = useSelector(state => state?.appState?.loadingButton),
    isLoading = action && action === loadingButton

  function handleClick(e) {
    if(disabled) return
    onClick(e)

    if(!goThrough) return
    if (!e) e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
  }

  function handleHover(e) {
    if(disabled) return
    onHover(e)

    if(!goThrough) return
    if (!e) e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
  }

  return (
    <StyledClickable
      onClick={handleClick}
      onMouseEnter={handleHover}
      marg={marg}
      zIndex={zIndex}
      disabled={disabled || isLoading}
      ogOpacity={ogOpacity}
      wid={wid}
      ht={ht}
    >
      {children}
    </StyledClickable>
  )
}

export default Clickable
