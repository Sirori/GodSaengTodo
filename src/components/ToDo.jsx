import {useState} from 'react'
import Modal from './Modal';

function ToDo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This function toggles the modal's state between open and closed.
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      {/* The same button is now used to open and close the modal. */}
      <button onClick={toggleModal}>모달 토글</button>

      {/* Modal Component */}
      <Modal isModalOpen={isModalOpen} />
    </>
  );
}

export default ToDo