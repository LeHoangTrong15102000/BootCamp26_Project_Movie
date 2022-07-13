import React from 'react'
import { useForm } from 'react-hook-form'

const AddMovie = () => {

  const {} = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      sapChieu: "",
      dangChieu: "",
      hot: "",
      danhGia: "",      
    }
  })
  return (
    <form></form>
  )
}

export default AddMovie