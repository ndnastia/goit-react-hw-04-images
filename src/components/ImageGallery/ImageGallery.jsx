import { Component } from 'react';

import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Modal } from 'components/Modal/Modal';


export default class ImageGallery extends Component {
    state = {
        isOpen: false,
        data: null,
    }
   componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.onCloseModal();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.onCloseModal();
    }
  };
    onOpenModal = modalData => {
        
        this.setState({ isOpen: true, data:modalData })
    
    }

    onCloseModal = () => {
        this.setState({isOpen: false, data: null})
    }

    render() {
        
        return (
            <div>
                <ul className={styles["ImageGallery"]}>
                {this.props.images.map((image) => <ImageGalleryItem {...image} key={image.id} onOpenModal={this.onOpenModal} />)}
            </ul>

                {this.state.isOpen && <Modal largeImage={this.state.data.largeImageURL} id={this.state.data.id} close={this.onOverlayClick} />}
            </div>
             
        )
    }
}