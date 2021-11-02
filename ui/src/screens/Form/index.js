import { useState } from 'react';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { createGist } from 'api/github';

import './style.css';


const Form = () => {
  const [gist, setGist] = useState();

  const formik = useFormik({
    initialValues: {
      title: '',
      text: ''
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(),
      text: yup.string().required()
    }),
    onSubmit: async (values) => {
      const newGist = await createGist(values);
      setGist(newGist);
    }
  });

  if (gist) {
    return <Redirect to={`/gist/${gist.id}`} />;
  }

  return (
  <>
  <h2 className="headline">New Post</h2>
  <form className="new-post-form" onSubmit={formik.handleSubmit}>
    <input placeholder="Title" id="title" name="title" onChange={formik.handleChange} value={formik.values.title} />
    { formik.errors.title && <div className="error">{formik.errors.title}</div>}
    <textarea placeholder="Text" id="text" name="text" onChange={formik.handleChange} value={formik.values.body} rows="10"></textarea>
    { formik.errors.text && <div className="error">{formik.errors.text}</div>}
    <button className="call-to-action" type="submit" disabled={formik.isSubmitting} >Publish</button>
  </form>
  </>
  )

}
export default Form;
