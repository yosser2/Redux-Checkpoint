import { useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Function = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      dispatch({ type: "add-task", text: inputRef.current.value });
    }
  };

  return (
    <>
      <h1 style={{ color: "white", padding: "20px" }}>
        <i class="fa-solid fa-list-check" style={{ marginRight: "20px" }}></i>
        My TO DO APP
      </h1>
      <form
        onSubmit={submitHandler}
        style={{ width: "500px", marginLeft: "400px", marginTop: "15px" }}
      >
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            ref={inputRef}
            placeholder="add a task"
            aria-label="add task"
            aria-describedby="basic-addon2"
          />
          <Button type="submit" variant="success" id="button-addon2">
            <i class="fa-solid fa-plus"></i>
          </Button>
        </InputGroup>
      </form>
    </>
  );
};

export default Function;
