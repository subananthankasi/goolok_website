import React from "react";
import { Modal, Form } from "react-bootstrap";

const EnquiryModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enquiry Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Name */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          {/* Mobile Number */}
          <Form.Group className="mb-3" controlId="formMobile">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter your mobile number" />
          </Form.Group>

          {/* Service List */}
          <Form.Group className="mb-3" controlId="formService">
            <Form.Label>Select Service </Form.Label>
            <Form.Select>
              <option>Select a service</option>
              <option>Patta & Others</option>
              <option>Land Servey</option>
              <option>Certicates</option>
              <option>Registration / Drafting</option>
              <option>Land Approval</option>
            </Form.Select>
          </Form.Group>

          {/* Message */}
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
          </Form.Group>

          <div className="d-flex justify-content-end">
          <a className="btn text-end" style={{ backgroundColor: "#2b2e3a", color: "white" }} type="submit">
            Submit
          </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EnquiryModal;
