import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Clickable from './Clickable'
import Text from './Text'
import Col from './Col'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const ModalBg = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${props => props.bg || 'rgba(0, 0, 0, 0.8)'};
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.visible ? 1 : `0;
    pointer-events: none;
  `};


  transition: opacity 0.1s;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  position: relative;
`

const ContentArea = styled.div`
  z-index: 1;
  width: ${props => props.wid || '456px'};
  height: ${props => props.ht || 'unset'};
  background-color: white;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  border-radius: 24px;
  min-height: 300px;

  animation: ${fadeIn} 0.4s linear;
`

const CloseContainer = styled.div`
  position: absolute;
  height: 64px;
  display: flex;
  justify-content: flex-end;
  right: 20px;
  top: 5px;
`

const Modal = ({ 
  children, 
  visible, 
  closeModal = () => null, 
  wid,
  ht,
  noOutsideClick,
  modalBg
}) => {

  useEffect(() => {
    document.addEventListener('keydown', handleEsc)

    return () => document.removeEventListener('keydown', handleEsc)
  })

  useEffect(() => {
    if(visible) {
        document.body.style.overflow = 'hidden'
        return () => null
    }

    document.body.style.overflow = 'unset'
  }, [visible])

  function handleEsc(e) {
    if(!visible || e.keyCode !== 27) return

    closeModal()
  }

  function handleBgClose(e) {
    if(noOutsideClick) return null

    // GUARD FOR SVG CLICKS
    if(typeof e.target.className === 'object') return
    if(
      !e.target.className.includes('modal-container')
      && e.target.id !== 'modal'
    ) return null

    closeModal()
  }

  return (
    <ModalBg 
      id='modal' 
      onClick={handleBgClose}
      bg={modalBg}
      visible={visible}
    >
        <Container className='modal-container'>
            <ContentArea wid={wid} ht={ht}>
                <CloseContainer>
                    <Clickable onClick={closeModal}>
                        <Text col='red'>
                            X
                        </Text>
                    </Clickable>
                </CloseContainer>

                <Col>
                    {children}
                </Col>
            </ContentArea>
        </Container>
    </ModalBg>
  )
}

export default Modal
