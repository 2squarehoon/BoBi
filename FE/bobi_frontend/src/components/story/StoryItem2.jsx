import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";

function StoryItem2() {
  const [ story, setStory ] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/stories/2")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        // console.log(data);
        setStory(data);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>{story["title"]}</button>
      <Modal open={modalOpen} close={closeModal} header={story.title}>
        <p>{story["content"]}</p>
      </Modal>
    </React.Fragment>
  )
};

export default StoryItem2;