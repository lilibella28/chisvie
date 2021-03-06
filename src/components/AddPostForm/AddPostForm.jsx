import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import '../AddPostForm/AddPostForm.css'
export default function AddPuppyForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    caption: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('caption', state.caption)
    props.handleAddPost(formData); 
    
    // Have to submit the form now! We need a function!
  }


  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.TextArea
              rows={2}
                  className="form-control"
                  name="caption"
                  value={state.caption}
                  placeholder="What's on your mind?"
                  onChange={handleChange}
                  required
              /> 
              
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
               <Segment.Inline>
              <Button
                type="submit"
                className="btn"
              >
                ADD
              </Button>
              </Segment.Inline>  
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}