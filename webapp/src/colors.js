import { css } from '@emotion/core'

export const colorsCss = css`
  --link-color: #000;
  --background-color: #d1d5da;
  --modal-background: #a8a0a070;
  --modal-main: white;
  --list-hover-color: #54525236;
`

export const colors = {
  background: 'var(--background-color)',
  links: 'var(--link-color)',
  modal: {
    background: 'var(--modal-background)',
    main: 'var(--modal-main)'
  },
  list: {
    hover: 'var(--list-hover-color)'
  }
}
