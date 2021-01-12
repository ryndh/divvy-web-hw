import React from 'react'
import { Formik, Form, Field } from 'formik'

const BasicForm = ({ name, fields, onSubmit, children, hiddenVals = {} }) => (
  <div>
    <h1>{name}</h1>
    <Formik
      initialValues={{
        ...fields.reduce((obj, { label }) => {
          obj[label] = ''
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
        <Form>
          {fields.map(({ type, label, value }, idx) => {
            const key = `${idx}${label}`
            return (
              <>
                <label htmlFor={label}>{label}</label>
                <Field key={key} name={label} type={type} value={value} />
              </>
            )
          })}
          {children}
          <button disabled={isSubmitting} type='submit'>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div >
)

export default BasicForm
