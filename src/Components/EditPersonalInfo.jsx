import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from 'react-icons/ai';


function EditPersonalInfo({ signedIn, fullName, description, updateTopBar, profilePic, setProfilePic }) {
    const [full_name_edit, setName] = useState(fullName)
    const [description_edit, setDescription] = useState(description)
    const [show, setShow] = useState(false);
    const [temp_image, setTempImg] = useState(profilePic)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleImage(e) {
        console.log(e.target.files)
        setTempImg(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <>
            <div className="edit" onClick={handleShow} style={{ display: signedIn ? "block" : "none" }}>
                <AiOutlineEdit />
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Personal Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='editmodal' >
                        <img id='profile_img' src={temp_image} alt='temp profile' />
                        <input type='file' name='profile_pic' onChange={handleImage} />
                        <h2 htmlFor="full_name_edit" className='form_label'>
                            Full Name
                        </h2>
                        <input type="text" className='edit_personal_info_description'
                            onChange={(e) => setName(e.target.value)}
                            full_name_edit="full_name_edit"
                            id="fullName"
                            name="full_name_edit"
                            defaultValue={full_name_edit} />
                        <h2 htmlFor="description_edit" className='form_label'>
                            Description
                        </h2>
                        <input className='edit_personal_info_description'
                            form='editmidal'
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            description_edit="description_edit"
                            id="description_edit"
                            name="description_edit"
                            defaultValue={description_edit} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" form='editmodal' onClick={() => {
                        handleClose()
                        updateTopBar(full_name_edit, description_edit)
                        setProfilePic(temp_image)
                    }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default EditPersonalInfo;