import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

const customStyles = {
    overlay: {
        backgroundColor      : 'rgba(0, 3, 51, 0.6)'
    },
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgba(0, 3, 51, 0)',
      borderRadius          : '0px',
      padding               : 'none',
      width                 : '370px',
      textAlign             : 'center',
      border                : 'none',
      zIndex                : '11',
    }
  };
  
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  //Modal.setAppElement('#errorModal')

  
  export default class MessageModal extends React.Component {
    constructor() {
      super();
  
      this.state = {
        modalIsOpen: false
      };
    }
  
    openModal = () => {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = 'white';
      // this.subtitle.style.marginRight = 'auto';
      // this.subtitle.style.marginLeft = '5px';
    }
  
    closeModal = () => {
      this.setState({modalIsOpen: false});
    }

    rightActionClick = () => {
      this.props.onRightActionClick && this.props.onRightActionClick();
      this.closeModal();
    }

    leftActionClick = () => {
      this.props.onLeftActionClick && this.props.onLeftActionClick();
      this.closeModal();
    }


  
    render() {
      const {type, alertBodyColorClassName, leftActionText, leftActionClassName, rightActionClassName, rightActionText, message, mainMessage} = this.props;
      let modalBody;

      if(type === 'error')
        {
          modalBody = (
            <div className="error-body">
                <div className="title-bg">
                    <i className="fa fa-exclamation-circle"></i>
                    <h2>{message}</h2>
                </div>
                <div className="message-bg">Try again</div>
            </div>
          )
        }
      else {
        modalBody = (
          <div className={alertBodyColorClassName}>
              <div className="alert-title-bg">
                  <div className="alert-title alert-message" >{message}</div>
                  <div className="alert-main-message">{mainMessage}</div>
              </div> 
              <div className="triangle"></div>
              <div className="button-container">
              <button className={leftActionClassName} onClick={this.leftActionClick} >{leftActionText}</button>
              <button className={rightActionClassName} onClick={this.rightActionClick}>{rightActionText}</button>
              </div>
          </div>
        )
      }

      return (
        <div>
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Error Modal"
            >
                <button onClick={this.closeModal} className="close-button"><i className="fa fa-times"></i></button>
                {modalBody}
            </Modal>
        </div>
      );
    }
  }
  