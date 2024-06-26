import {useState} from 'react'
import Modal from './Modal';

function ToDo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This function toggles the modal's state between open and closed.
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className='mx-10 my-5'>
      {/* The same button is now used to open and close the modal. */}
      <button onClick={toggleModal}>ToDo</button>

      {/* Modal Component */}
      <Modal isModalOpen={isModalOpen} />
    </div>
  );
}

export default ToDo