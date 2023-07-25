// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExampleModal from "./components/modal";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import ViewModal from "./components/View";
import Form from "react-bootstrap/Form";
import { BsSearch } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
function App() {
  let url = "http://localhost:4500/students";
  const [post, setPost] = useState(null);
  const [myData, setMyData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = myData.slice(firstIndex, lastIndex);
  console.log("records", records);
  const npages = Math.ceil(myData.length / recordsPerPage);
  console.log(npages);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function searchBar(e) {
    setSearch(e.target.value);
    console.log(search);
  }
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setMyData(res?.data);
        // setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [length]);

  function deletePost(id) {
    console.log(id);
    if (window.confirm("Are you sure u want to detele.")) {
      axios.delete(`${url}/${id}`).then(() => {
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
  const sorting = (col) => {
    // debugger
    console.log(col);
    if (order === "ASC") {
      setOpen(true);
      const sorted = [...myData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMyData(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      setOpen(false);
      const sorted = [...myData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMyData(sorted);
      setOrder("ASC");
    }
  };

  const sorting1 = (col) => {
    debugger;
    console.log(col);
    if (order === "DSC") {
      const sorted = [...myData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMyData(sorted);
      setOrder("ASC");
    }
  };

  function notify() {
    toast.error("Data Deleted Successfully", {
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
      <header className="bg-primary ">
        <div className="container heading d-flex justify-content-between ">
          <h1 style={{ color: "white" }}>
            <FaUsers
              style={{ fontSize: "40px", color: "white", marginBottom: "5px" }}
            />{" "}
            Employee Details
          </h1>
          <div className="main">
            <Form.Control
              type="text"
              placeholder="Search Here"
              style={{ width: "500px", height: "30px", marginTop: "16px" }}
              onChange={(e) => {
                searchBar(e);
              }}
            />
            <div className="abso">
              <BsSearch
                style={{ position: "absolute", top: "40%", left: "74%" }}
              />
            </div>
          </div>
          <Button
            className="mx-1"
            variant="tertiary"
            color="tertiary"
            rippleColor="light"
            style={{ width: "", height: "40px" }}
            onClick={() => {
              setShow(true);
              setEditId("");
            }}
          >
            <MdAddCircleOutline
              style={{ fontSize: "30px", color: "white", marginTop: "5px" }}
            />
          </Button>
        </div>
      </header>
      <ExampleModal
        show={show}
        setShow={setShow}
        buttonName={editId ? "Update" : "Add"}
        editId={editId}
        setLength={setLength}
        post={post}
        modalTitle={
          editId ? "Update Employee Details" : "Create New Employee Details"
        }
      />
      <div className="container ">
        <Table>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Id</th>
              <th style={{ cursor: "pointer" }}>
                First Name
                <button
                  onClick={() => {
                    sorting("FirstName");
                  }}
                  style={{ border: "0px", backgroundColor: "white" }}
                >
                  {!open ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                </button>
              </th>
              <th style={{ cursor: "pointer" }}>
                Last Name
                {/* <button onClick={()=>{sorting('LastName')}} style={{border:'0px',backgroundColor:'white'}}>{!open? <AiOutlineArrowUp/>: <AiOutlineArrowDown/>}
                 </button> */}
                <AiOutlineArrowUp
                  onClick={() => {
                    sorting("LastName");
                  }}
                />
                <AiOutlineArrowDown
                  onClick={() => {
                    sorting1("LastName");
                  }}
                />
              </th>
              <th style={{ cursor: "pointer" }}>
                Age
                <AiOutlineArrowUp
                  onClick={() => {
                    sorting("Age");
                  }}
                />
                <AiOutlineArrowDown
                  onClick={() => {
                    sorting1("Age");
                  }}
                />
              </th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          {records
            .filter((post) => {
              return search.toLowerCase() === ""
                ? post
                : post.FirstName.toLowerCase().includes(search) ||
                    post.LastName.toLowerCase().includes(search) ||
                    post.Age.toLowerCase().includes(search);
            })
            .map((post) => {
              return (
                <>
                  <tbody
                    style={{
                      textAlign: "center",
                      backgroundColor: "white !important",
                    }}
                  >
                    <tr>
                      <td style={{ backgroundColor: "white" }}>{post.id}</td>
                      <td>{post.FirstName}</td>
                      <td>{post.LastName}</td>
                      <td>{post.Age}</td>
                      <td>{post.Gender}</td>
                      <td>
                        {" "}
                        <BiSolidEdit
                          className="me-3"
                          style={{
                            color: "green",
                            fontSize: 25,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            updatePost(post.id, post);
                          }}
                        ></BiSolidEdit>
                        <ViewModal id={post.id} post={post} />
                        <AiOutlineDelete
                          style={{
                            color: "red",
                            fontSize: 25,
                            cursor: "pointer",
                          }}
                          onClick={() => deletePost(post.id)}
                        />
                      </td>
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
              );
            })}
        </Table>
      </div>
      <div className="container">
        <nav style={{ textAlign: "center" }}>
          <ul
            className="pagination"
            style={{ listStyle: "none", display: "flex", padding: "0px" }}
          >
            <li className="page-item">
              <a href="/" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => {
              return (
                <>
                  <li
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <div
                      className="page-link"
                      onClick={() => {
                        changeCPage(n);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {n}
                    </div>
                  </li>
                </>
              );
            })}
            <li className="page-item">
              <a href="/" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
  function prePage(event) {
    event.preventDefault();
    if (currentPage !== firstIndex && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage(event) {

    event.preventDefault();
    if (currentPage !== lastIndex && currentPage !== numbers?.length) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default App;
