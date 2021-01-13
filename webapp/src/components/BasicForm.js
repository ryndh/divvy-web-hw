import React from 'react'
import { Formik, Form, Field } from 'formik'
import { css } from '@emotion/core'

const formWrapCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const formElementCss = css`
  display: flex;
  justify-content: space-between;
`
const formCss = css`
  width: 40%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 3px;
  }
`
const buttonCss = css`
  width: 60%;
  align-self: center;
`
const BasicForm = ({ children, fields, hiddenVals = {}, name, onSubmit }) => {
  return (
    <div css={formWrapCss}>
      {name && <h1>{name}</h1>}
      <Formik
        initialValues={{
          ...fields.reduce((obj, { label, value }) => {
            obj[label] = value || ''
            return obj
          }, {})
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log({ ...values, ...hiddenVals })
          onSubmit({ variables: { ...values, ...hiddenVals } })
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form css={formCss}>
            {fields.map(({ label, type }, idx) => {
              const key = `${idx}${label}`
              return (
                <div key={key} css={formElementCss}>
                  <label htmlFor={label}>{label.toUpperCase()}</label>
                  <Field name={label} type={type} />
                </div>
              )
            })}
            {children}
            <button css={buttonCss} disabled={isSubmitting} type='submit'>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default BasicForm
