import React, { useState } from 'react'
import styled from 'styled-components'

const bodyStyles = (props) => `
  text-align: ${props.center ? 'center' : props.right ? 'right' : 'left'};
  font-size: ${props.size ? `${props.size}` : '16px'};
  ${props.ht && `height: ${props.ht};`};
  ${props.hideOverflow && 'overflow: hidden'};

  ${props.b0 && `
    font-size: 18px;
    line-height: 24px;
  `};

  ${props.b2 && `
    font-size: 14px;
    line-height: 18px;
  `};

  ${props.c1 && `
    font-size: 12px;
    line-height: 16px;
  `};

  ${props.c2 && `
    font-size: 10px;
    line-height: 14px;
  `};

  ${(props.wid || props.maxWid) && `
    width: ${props.wid || 'auto'};
    max-width: ${props.maxWid || 'auto'};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `};
  font-weight: ${props.weight ? `${props.weight}` : props.bold ? 700 : props.med ? 500 : 400};
  margin: ${props.marg ? props.marg : '0'};
  ${props.col && `color: ${props.col};`};
  ${props.maxWid && `max-width: ${props.maxWid};`};
  ${props.lineHt && `line-height: ${props.lineHt};`};
  ${props.spacing && `letter-spacing: ${props.spacing};`};
  ${props.overflowWrap && `overflow-wrap: ${props.overflowWrap};`};
  ${props.textOverflow && `text-overflow: ${props.textOverflow};`};
  ${props.overflow && `overflow: ${props.overflow};`};
  ${props.wordBreak && `word-break: ${props.wordBreak};`};
  ${props.whiteSpace && `white-space: ${props.whiteSpace};`};
  ${props.ht && `height: ${props.ht};`};
`

const BodyText = styled.p`
  ${props => bodyStyles(props)};
`

const Text = (props) => {

  return (
    <BodyText {...props} ref={props.textRef}>{props.children}</BodyText>
  )
}

export default Text