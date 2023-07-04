import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


function ExampleModal({ show, setShow, buttonName, editId, setLength, post,modalTitle }) {

  const [profile, setProfile] = useState({
    FirstName: "", LastName: "", Age: "", Gender: ''
  });

  const handleClose = () => {
    setShow(false);
    setProfile({ FirstName: '', LastName: '', Age: '', Gender: '' }); 
  };

  function handleChange(e) {
    const { name, value } = e.target;


    
    setProfile({ ...profile, [name]: value });
    console.log(value,"Updated Gender");

  }
  function notify() {
    toast.success('Data Added successfully', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  let url = "http://localhost:4500/students";

  function submit(e) {
    e.preventDefault();
    
    if (!editId) {
      axios.post(url, {
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        Age: profile.Age,
        Gender: profile.Gender

      })
        .then((res) => {
          setLength(res.data.length);
        })
        .catch((error) => {
          console.log(error);
        })
        // notify();
    }
    else {
      axios
        .put(`${url}/${editId}`, {
          FirstName: profile.FirstName,
          LastName: profile.LastName,
          Age: profile.Age,
          Gender: profile.Gender
        })
        .then((res) => {
          // debugger;
          setLength(res?.data?.length);
          alert("update");
          // notify();
        });
    }
    notify();
    handleClose();
  }

  useEffect(() => {
    if(post){
      setProfile({ FirstName:  post.FirstName, LastName: post.LastName, Age: post.Age, Gender: post.Gender });
     
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { submit(e) }}>
            <Form.Group className="mb-3" >
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="first name" onChange={(e) => { handleChange(e) }} name='FirstName' value={profile.FirstName} required />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="last name" onChange={(e) => { handleChange(e) }} name='LastName' value={profile.LastName} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="age" onChange={(e) => { handleChange(e) }} name='Age' value={profile.Age} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className='me-2'>Gender:</Form.Label>
              <Form.Check
                onChange={(e) => { handleChange(e) }}
                value='Male'
                inline
                label="Male"
                name="Gender"
                checked={profile.Gender==='male'}
                type='radio' />
              <Form.Check
                onChange={(e) => { handleChange(e) }}
                inline
                checked={profile.Gender==='female'}
                label="Female"
                name="Gender"
                value='Female'
                type='radio' />
            </Form.Group>
            <div className='d-flex justify-content-end'>
              <Button variant="primary me-2" type='submit' >
                {buttonName}
              </Button>
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />

              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>

          </Form>

        </Modal.Body>



      </Modal>
    </>
  );
}

export default ExampleModal;