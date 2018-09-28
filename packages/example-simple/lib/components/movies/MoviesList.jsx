/* 

components/MoviesList.jsx #tutorial-step-7 - 
The component for our list of movies, which we called in to modules/routes.js.

Wrapped with the "withList" and "withCurrentUser" containers.

#tutorial-step-11 -
Now, we are going to look at this in a bit more detail.
This component is a React component. We only have one but it does a bunch of things... 
*/

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Components, withUpdate, withCreate, withCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

{
  /* These are "props". They are variables for the component that are passed by the components parent. 
  In this case, to create the parent we wrapped the component in "Higer Order Compoents" (See the Higer Order Compoents section below.) 
    By doing this, we can pass on those props to the children of he HOCs and give them access to the props... */
}

class MoviesList extends Component {
  constructor(props){
    super();
    this.state = {newDocId : false};
  }

  saveNewDocId = (returnedFromCreate)=>{
    let newDocId = returnedFromCreate.data.createMovie.data._id;
    this.setState({newDocId: newDocId})
  };

  createNewDoc = () => {
    this.props.createMovie({data:{name:"Terminator II"}}).then(this.saveNewDocId)
  };

  editDoc = ()=>{
    // this.props.updateMovie({selector:{_id:"8KCwqruDyAmaLAMTB"},
    this.props.updateMovie({selector:{_id:this.state.newDocId},
      data:{review:"Once again, Schwarzenegger shows why he's the god emperor of the universe."}})
  };

  render = () =>  <div
    onClick={this.createNewDoc}
    onDoubleClick={this.editDoc}
  >
    Click to create new review document. Double click to edit new review document.

    {this.state.newDocId ?
      <p>
        New document id is: {this.state.newDocId}.
      </p>
      : null }
  </div>
}


// ...this is where we specify how to load the data in the options object that we pass to withList
// if you want, you can specify many more options here, like how often to look for data or what fields to query from, filtering and sorting options. ...
const options = {
  collection: Movies,
};

// These two functions (withList & withCurrentUser) are Higher Order Components (HOC) and by wrapping our component with this we can give it "props". (See the "props" section at the top.)
registerComponent({ name: 'MoviesList', component: MoviesList, hocs: [withCurrentUser, [withUpdate, options], [withCreate, options]] });

// #tutorial-step-12 - Well. that's it! If you like this, go on to the movies-example, where we get more granular when it comes to data loading.
// Well thanks for tuning in! Come visit us at our chat room at slack.vulcanjs.org. See you soon!
