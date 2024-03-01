// List.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
const List = () => {
  const tasks = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'done', 'unfinished'

  const deleteHandler = (id) => {
    dispatch({ type: "delete-task", id });
  };

  const toggleDone = (id) => {
    dispatch({ type: "toggle-task", id });
  };

  const showEditTaskModal = (id, task) => {
    setEditTaskId(id);
    setEditedTask(task.text);
    setShowEditModal(true);
  };

  const hideEditTaskModal = () => {
    setEditTaskId(null);
    setEditedTask("");
    setShowEditModal(false);
  };

  const editHandler = () => {
    if (editedTask.trim() !== "") {
      dispatch({
        type: "edit-task",
        id: editTaskId,
        text: editedTask,
      });
      hideEditTaskModal();
    }
  };

  const filteredTasks = () => {
    switch (filter) {
      case "done":
        return tasks.filter((task) => task.isDone);
      case "unfinished":
        return tasks.filter((task) => !task.isDone);
      default:
        return tasks;
    }
  };

  return (
    <>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light">
          <i class="fa-solid fa-filter"></i>
        </Button>
        <Button variant="outline-secondary" onClick={() => setFilter("all")}>
          ALL <i class="fa-solid fa-reply-all"></i>
        </Button>
        <Button variant="outline-success" onClick={() => setFilter("done")}>
          DONE <i class="fa-solid fa-check-double"></i>
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => setFilter("unfinished")}
        >
          UNFINISED <i class="fa-solid fa-check"></i>
        </Button>
      </ButtonGroup>

      <ListGroup as="ol" numbered>
        {filteredTasks().map((task, id) => (
          <ListGroup.Item
            key={id}
            as="li"
            style={{
              width: "500px",
              marginLeft: "400px",
              fontSize: "25px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <>
              <Form.Check
                type="checkbox"
                checked={task.isDone}
                onChange={() => toggleDone(id)}
                style={{
                  position: "absolute",
                  marginTop: "2px",
                  left: "10%",
                  fontSize: "25px",
                }}
              />
              {}
              <span style={{ marginLeft: "5px" }}>{task.text}</span>
              <div>
                <Button
                  variant="outline-secondary"
                  value={id}
                  onClick={() => showEditTaskModal(id, task)}
                  style={{ margin: "5px" }}
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  value={id}
                  onClick={() => deleteHandler(id)}
                  style={{ margin: "5px" }}
                >
                  <i class="fa-solid fa-trash"></i>
                </Button>
              </div>
            </>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={hideEditTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideEditTaskModal}>
            Close
          </Button>
          <Button variant="primary" onClick={editHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default List;
