import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import selfieImages from './selfies-test-images';
import './css/MyCollectionPage.css';
import SelectedImage from "./SelectedImage";


const PHOTO_SET = [
    {
        src: selfieImages[0].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[3].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[6].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[7].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[8].url,
        width: 1,
        height:1
    },
]

export default class MyCollectionPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: PHOTO_SET,
            selectAll: false
        };

            // select photo binding
            this.selectPhoto = this.selectPhoto.bind(this);
            // select binding
            this.toggleSelect = this.toggleSelect.bind(this);
            // add to collection binding
            this.toggleSubmit = this.toggleSubmit.bind(this);
    }

    // select photo function
    selectPhoto(event, obj) {
        let photos = this.state.photos;
        photos[obj.index].selected = !photos[obj.index].selected;
        this.setState({ photos: photos });
      }

      // select all photos function
      toggleSelect() {
        let photos = this.state.photos.map((photo, index) => {
          return { ...photo, selected: !this.state.selectAll };
        });
        this.setState({ photos: photos, selectAll: !this.state.selectAll });
      }

      //submit
      toggleSubmit(event, obj, index) {
          alert("Selected Photos have been removed from your collection");
          
      }


        render() {
        return(
            <div className="component-wrapper">
                <h1> Your photo collection: </h1>
            <p>
              <button className="toggle-select" onClick={this.toggleSelect}>
                toggle select all
              </button>
              <button className="remove-from-your-collection" onClick={this.toggleSubmit}>
                Remove selected photos from collection
              </button>
            </p>
            <Gallery
              photos={this.state.photos}
              onClick={this.selectPhoto}
              ImageComponent={SelectedImage}
              direction={"column"}
            />
          </div>
        );
    }
}