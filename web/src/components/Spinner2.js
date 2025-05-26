import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import Col from './Col'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: rgba(210, 216, 223, 0.7);
`

const fadeDelay = keyframes`
  0%, 39%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`

const Spinner3 = styled.div`
  width: ${props => props.spinnerSize || '25px'};
  height: ${props => props.spinnerSize || '25px'};
  position: relative;
  margin: auto;

  .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-circle:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: blue;
    border-radius: 100%;

    -webkit-animation: ${fadeDelay} 1.2s infinite ease-in-out both;
    animation: ${fadeDelay} 1.2s infinite ease-in-out both;
  }

  ${[...Array(12)].map((x, i) => (
    `.sk-circle-${i} {
      transform: rotate(${30 * (i)}deg);
    }

    .sk-circle-${i}:before {
      animation-delay: -${1.2 - (i * 0.1)}s;
    }
    `
  ))}
`

const Spinner = (props) => {
  if(props.fullScreen) {
    if(!props.show) return null
    return (
      <Overlay>
        <Col center ht='100%'>
          <Spinner3 {...props} >
            {[...Array(12)].map((x, i) => (
              <div className={`sk-circle-${i} sk-circle`} />
            ))}
          </Spinner3>
        </Col>
      </Overlay>
    )
  }

  return (
    <Spinner3 {...props} >
      {[...Array(12)].map((x, i) => (
        <div className={`sk-circle-${i} sk-circle`} />
      ))}
    </Spinner3>
  )
}

export default Spinner
