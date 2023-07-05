
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
 
const DeleteConfirmation = () => {


    const submit = () => {
        confirmAlert({
          title: "Confirm to submit",
          message: "Are you sure to do this.",
          buttons: [
            {
              label: "Yes",
              onClick: () => alert("Click Yes")
            },
            {
              label: "No"
              // onClick: () => alert("Click No")
            }
          ]
        });







    return (



        <button onClick={submit}>Click me</button>

        
    )
}
}
export default DeleteConfirmation;