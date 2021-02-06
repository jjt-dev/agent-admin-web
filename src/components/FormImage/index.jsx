import { Form } from 'antd'
import React from 'react'
import ImageUpload from '../ImageUpload'

const FormImage = ({
  form,
  label,
  name,
  message,
  imageUrl,
  noImageCrop = false,
}) => {
  const handleLogoChange = (imageUrl) => {
    form.setFieldsValue({
      [name]: imageUrl,
    })
  }

  return (
    <Form.Item rules={[{ required: true, message }]} label={label} name={name}>
      <ImageUpload
        callback={handleLogoChange}
        imageUrl={imageUrl}
        noImageCrop={noImageCrop}
      />
    </Form.Item>
  )
}

export default FormImage
