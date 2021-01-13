import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { css } from '@emotion/core'
import { colors } from '../colors'

const node = document.getElementById('portal-mount')
const modalWrapperCss = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.modal.background};
`
const modalCss = css`
  position: relative;
  width: 70%;
  height: 40%;
  background-color: ${colors.modal.main};
  border-radius: 7px;
  padding: 0px 10px;
`
const modalInnerCss = css`
  padding: 15px 5px;
`
const closeButtonCss = css`
  position: absolute;
  right: 5px;
  top: 5px;
`

const Portal = ({ children }) => {
  return createPortal(children, node)
}
export const useModal = () => {
  const [open, setOpen] = useState()
  const toggleOpen = (status) => {
    setOpen(status || !open)
  }
  return { open, toggleOpen }
}

const ModalButton = ({ toggleOpen, title = 'Open', onClick = () => { } }) => {
  const handleOpen = () => {
    onClick()
    toggleOpen()
  }
  return (
    <button onClick={handleOpen} type='button'>{title}</button>
  )
}
const ModalContent = ({ open, toggleOpen, children, title = '' }) => {
  return (
    <>
      {open && (
        <Portal>
          <div css={modalWrapperCss}>
            <div css={modalCss}>
              <h3>{title}</h3>
              <div css={modalInnerCss}>
                {children}
              </div>
              <button css={closeButtonCss} onClick={() => toggleOpen(false)}>x</button>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export const Modal = {
  Button: ModalButton,
  Content: ModalContent
}
