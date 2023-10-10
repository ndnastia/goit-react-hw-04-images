import { Component } from "react";

import style from "./App.module.css"

import { fetchImages } from "helpers/api";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";



export class App extends Component {
  state = {
    images: null,
    isLoading: false,
    error: null,
    searchQuery: '',
    isButtonShown: false, 
    page: 1,
    totalPages: 0,
  }

  fetchAllImages = async () => {
    try {
      const { page, searchQuery } = this.state;
      this.setState({ isLoading: true });
      const images = await fetchImages(page, searchQuery);
      
      this.setState({ images: images.hits, totalPages: Math.ceil(images.totalHits / 12), });
      

      if (images.hits.length > 0) {
        this.setState({
          
          isButtonShown: true,
          });
        
      } 

      if (images.hits.length < 0) {
        this.setState({
          
          isButtonShown: false,
          });
      }
      
    } catch (error) {
      this.setState({ error: error.message })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {
    this.fetchAllImages();
  }

  componentDidUpdate(_, prevState) {
    
    if (
      prevState.searchQuery!== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchAllImages(); 
    }
  }

  onLoadMore = () => {
    this.setState(prevState => {
      return {page: prevState.page + 1}
    })
  }

  onHandleSubmit = event => {
  event.preventDefault();
    const query = event.currentTarget.elements.searchQuery.value;
    this.setState({ searchQuery: query, images: null, page: 1 })
    
    event.currentTarget.reset();
  }

  render() {
    const showImages =
      Array.isArray(this.state.images) && this.state.images.length;
    
    return (
      <div className={style['App']}>
        
        <Searchbar handleSubmit={this.onHandleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.error && <p className={style["error"]}>{this.state.error}</p>}
        {showImages && <ImageGallery images={this.state.images} />}
        
        {this.state.isButtonShown && <Button loadMore={this.onLoadMore} />} 
        
        
        
    </div>
      )
    }
  
}
