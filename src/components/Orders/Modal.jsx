import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    padding: '20px',
    border: '2px solid #000',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    overFlow:'scroll'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

// Set the app element for accessibility
Modal.setAppElement('#root');

function DataModal({ open, handleClose, items }) {
  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Order Details Modal"
        aria={{
          labelledby: "heading",
          describedby: "description"
        }}
      >
        <h2 id="heading">Order Details</h2>
        <div id="description">
          <h3>Basic Info</h3>
          <p><strong>Order Number:</strong> {items?.order_number ?? 'N/A'}</p>
          <p><strong>Payment Status:</strong> {items?.financial_status ?? 'N/A'}</p>
          
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {items?.customer?.first_name ?? 'N/A'} {items?.customer?.last_name ?? 'N/A'}</p>
          <p><strong>Email:</strong> {items?.customer?.email ?? 'N/A'}</p>

          
          
          
          
          <h3>Refunds</h3>
          {items?.refunds && items.refunds.length > 0 ? (
            items.refunds.map((refund, index) => (
              <div key={index}>
                <p><strong>Refund Amount:</strong> {refund?.transactions?.[0]?.amount ?? 'N/A'} {refund?.transactions?.[0]?.currency ?? ''}</p>
                <p><strong>Processed At:</strong> {refund?.transactions?.[0]?.processed_at ?? 'N/A'}</p>
              </div>
            ))
          ) : (
            <p>No refunds available.</p>
          )}
        </div>

       <div>
        <input type="text" name="" placeholder='Notes: (For user to enter extra information for the database)' id="" />
       </div>
      </Modal>
    </div>
  );
}

DataModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

export default DataModal;
