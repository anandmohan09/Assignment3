// import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { GrView } from 'react-icons/gr';

const ViewModal = ({ id, post }) => {


  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <GrView onClick={handleShow}  className='me-3' style={{ color: 'yellow', fontSize: 25,cursor:'pointer' }}/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign:'center'}}>View Employee Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container' >
          <h3><span className="me-2">Id:</span>{post.id}</h3>
          <h4><span className='me-2'>FirstName:</span>{post.FirstName}</h4>
          <h4><span className='me-2'>LastName:</span>{post.LastName}</h4>
          <h4><span className='me-2'>Age:</span>{post.Age}</h4>
          <h4><span className='me-2'>Gender:</span>{post.Gender}</h4>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewModal;