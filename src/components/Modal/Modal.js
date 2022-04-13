import "./Modal.css";

function Modal({ rejectModal, acceptModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <h4 className="modal-question">Искаш да изтриеш бележката?</h4>
        <div className="modal-answers">
          <div onClick={rejectModal} className="modal-button cancel">
            Не
          </div>
          <div onClick={acceptModal} className="modal-button accept">
            Да
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
