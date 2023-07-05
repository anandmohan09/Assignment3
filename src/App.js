// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExampleModal from './components/modal';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import ViewModal from './components/View';
import Form from 'react-bootstrap/Form';
import {BsSearch} from 'react-icons/bs';
import {FaUsers} from 'react-icons/fa'
import {MdAddCircleOutline} from 'react-icons/md'
import {GrUpdate} from 'react-icons/gr';
function App() {
  let url = "http://localhost:4500/students";
  const [post, setPost] = useState(null);
  const [myData, setMyData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [length, setLength] = useState(0); 
  const[search,setSearch]=useState('');
  const[order,setOrder]=useState('ASC');
  function searchBar(e){
    setSearch(e.target.value);
    console.log(search);
  }
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
  }, [length])

  function deletePost(id) {
    console.log(id);
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
const sorting=(col)=>{
  debugger
  console.log(col);
  if(order==='ASC'){
    const sorted=[...myData].sort((a,b)=>a[col].toLowerCase()>b[col].toLowerCase()? 1:-1);
    setMyData(sorted);
    setOrder('DSC');
    
}
}

  function notify() {
    toast.error('Data Deleted Successfully', {
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
  
  return (
    <>
    <header className='bg-primary '>
    <div className='container heading d-flex justify-content-between '>
    
          <h1 style={{color:"white"}}><FaUsers style={{fontSize:"40px",color:"white", marginBottom:'5px'}}/> Employee Details</h1>
          <div className='main'>
          <Form.Control type="text" placeholder="Search Here" style={{width:'500px',height:'50px',marginTop:'6px'}} onChange={(e)=>{searchBar(e)}} />
         <div className='abso' 
     >
       <BsSearch style={{position:'absolute',top:'36%',left:'74%'}}/>
       </div>
    </div>
          <Button className='mx-1' variant='tertiary' color='tertiary' rippleColor='light' style={{width:'',height:'40px'}} onClick={() => {
            setShow(true);
            setEditId("");
            }}>

               <MdAddCircleOutline style={{fontSize:"30px",color:"white",marginTop:"5px"}}/>
          </Button>

        </div>
        </header>
      <ExampleModal show={show} setShow={setShow} buttonName={editId ? "Update" : "Add"} editId={editId} setLength={setLength} post={post} modalTitle={editId ?'Update Employee Details':'Create New Employee Details'} />
      <div className='container '>
        
        <Table >
          <thead style={{textAlign:'center'}}>
            <tr  >
              <th  >Id</th>
              <th onClick={()=>{sorting('FirstName')}} style={{cursor:'pointer'}}>First Name</th>
              <th onClick={()=>{sorting('LastName')}} style={{cursor:'pointer'}}>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          {myData.filter((post)=>{
            return search.toLowerCase()==='' ? post : post.FirstName.toLowerCase().includes(search) || post.LastName.toLowerCase().includes(search) || post.Age.toLowerCase().includes(search);
          }).map((post) => {
            return (
              <>
                <tbody style={{textAlign:'center',backgroundColor:'white !important'}}>
                  <tr>
                    <td style={{backgroundColor:'white'}}>{post.id}</td>
                    <td>{post.FirstName}</td>
                    <td>{post.LastName}</td>
                    <td>{post.Age}</td>
                    <td>{post.Gender}</td>
                    <td> <BiSolidEdit className='me-3' style={{ color: 'green', fontSize: 25,cursor:'pointer' }} onClick={() => { updatePost(post.id, post) }}></BiSolidEdit><ViewModal id={post.id} post={post}/>
                    
                    
                    <AiOutlineDelete style={{ color: 'red', fontSize: 25,cursor:'pointer' }} onClick={() => deletePost(post.id)} /></td>
                  </tr>
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
