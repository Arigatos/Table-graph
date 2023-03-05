import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImagePreview from "./ImagePreview";
import close from "../assets/images/close.png";

const InfoModal = ({ active, toggle, isOpen }) => {
  return (
    <Modal backdrop={false} isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <span>Characters Info</span>
        <button className="close" onClick={toggle}>
          <img src={close} alt="arrowDown" width="16px" height="16px" />
        </button>
      </ModalHeader>
      <ModalBody>
        <div className="modal-image">
          <ImagePreview src={active?.imageUrl} />
        </div>
        <div className="modal-info">
          <div className="modal-info__name">{active?.name}</div>
          {active?.tvShows?.length ? (
            <div className="modal-info__tv-shows">
              <span>TV Shows:&nbsp;</span>
              {active.tvShows.map((t) => t).join(", ")}
            </div>
          ) : null}
          {active?.videoGames?.length ? (
            <div className="modal-info__video-games">
              <span>Video Games:&nbsp;</span>
              {active.videoGames.map((v) => v).join(", ")}
            </div>
          ) : null}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InfoModal;
