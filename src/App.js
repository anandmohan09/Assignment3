// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExampleModal from './components/modal';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSolidEdit } from 'react-icons/bi';
// import { GrView } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import ViewModal from './components/View';
// import DeleteConfirmation from './components/deleteData';
// import Edit from './components/Edit';

function App() {
  let url = "http://localhost:4500/students";
  const [post, setPost] = useState(null);
  const [myData, setMyData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [length, setLength] = useState(0); 
  
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setMyData(res?.data)
        // setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData])

  function deletePost(id) {
    if(window.confirm('Are you sure u want to detele.')){
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        // alert("Post deleted!");
        setLength();
        notify();
      });
    }
  }

  function updatePost(id, post) {
    setShow(true);
    setEditId(id);
    setPost(post);
  }

  function notify() {
    toast.error('Data Deleted Successfully', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  
  return (
    <>
    
{/* <DeleteConfirmation/> */}
{/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} id={id} message={deleteMessage}  /> */}
      <ExampleModal show={show} setShow={setShow} buttonName={editId ? "Update" : "Add"} editId={editId} setLength={setLength} post={post} modalTitle={editId ? 'Update Employee Details':'Create New Employee Details'} />
      <div className='container mt-5'>
        <div className='heading d-flex justify-content-evenly'>
          <h1>Crud Operations</h1>
          <Button variant="primary" onClick={() => {
            setShow(true);
            setEditId("");
            }}>
            Create
          </Button>
        </div>
        <Table striped bordered hover className='mt-5'>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          {myData?.map((post) => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>{post.id}</td>
                    <td>{post.FirstName}</td>
                    <td>{post.LastName}</td>
                    <td>{post.Age}</td>
                    <td>{post.Gender}</td>
                    <td> <BiSolidEdit className='me-3' style={{ color: 'green', fontSize: 25,cursor:'pointer' }} onClick={() => { updatePost(post.id, post) }}></BiSolidEdit><ViewModal id={post.id} post={post}/><AiOutlineDelete style={{ color: 'red', fontSize: 25,cursor:'pointer' }} onClick={() => deletePost(post.id)} /></td>
                  </tr>
                  <ToastContainer
                    position="bottom-center"
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
                </tbody>
              </>
            )
          })}
        </Table>

      </div>
    </>
  );
}

export default App;
