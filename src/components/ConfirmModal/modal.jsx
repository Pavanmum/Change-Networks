import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modals = ({ heading, body, handleClose, handleConfirm, show }) => {
  return (
    <BootstrapModal show={show} onHide={handleClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{heading}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{body}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modals;



