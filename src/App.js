import React, { Component } from 'react';

import {Blogs, Posts} from './api/blogger'
import Navigation from './Navigation'
import FirstLogin from './FirstLogin'
import * as moment from 'moment';
import fetchJsonp from 'fetch-jsonp'

var secret = require('./secret.json');
// Hard coding those is fine. As long as we don't put api secret here!!!
export const API_KEY = secret.API_KEY;
export const CLIENT_ID = secret.CLIENT_ID;
export const SCOPE = 'profile email https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/drive.file';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingLabels: undefined,
      selectedBlog: undefined,
      postsCount: undefined,

      nextPageToken: undefined,
      posts: undefined,
      isInitialLoading: true,
      isSignedIn: false
    };
  }

  componentDidMount() {
    window.gapi.load('client:auth2:blogger:picker', this.initClient);

    if (!(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
      if (window.location.protocol !== "https:") {
        window.location = `https://${window.location.host}/`;
      }
    }
  }

  initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
    }).then(() => {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(
        (isSignedIn) => this.updateSigninStatus(isSignedIn)
      );
      // Handle the initial sign-in state.
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
     
    });
  };

  updateSigninStatus = (isSignedIn) => {
    this.setState({
      isSignedIn: isSignedIn
    });

    if (isSignedIn) {
      this.setState({
        isSignedIn: true,
        isInitialLoading: false,
      });
      this.makeApiCall();
    } else {
      this.setState({
        isSignedIn: false,
        isInitialLoading: false,
      });
    }
  };

  signIn = (event) => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  signOut = (event) => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  loadPostsInitial = async (statuses = ['live', 'scheduled', 'draft']) => {
    try {
      const myBlog = await Blogs.getMyFirstBlog();      
      
      const myPosts = await Posts.list(myBlog.id, statuses);
      this.setState({
        selectedBlog: myBlog,
        postsCount: myBlog.posts.totalItems,

        nextPageToken: myPosts.nextPageToken,
        posts: myPosts.items,
      });
      return { myBlog, myPosts };
    } catch (e) {
      // Ignore this error on logout
      if(this.state.isSignedIn) {
        alert(`There has been an error while loading posts of your blog! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
      }
      
      return {};
    }
  };

  loadPostsNext = async (statuses = ['live', 'scheduled', 'draft']) => {
    if (this.state.selectedBlog && this.state.nextPageToken) {
      try {
        const nextPosts = await Posts.list(this.state.selectedBlog.id, statuses, this.state.nextPageToken);
        this.setState({
          nextPageToken: nextPosts.nextPageToken,
          posts: [...this.state.posts, ...nextPosts.items],
        });
      } catch (e) {
        alert(`There has been an error while loading more blogs posts! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
      }
    } else {
      // For the case if initial load failed
      return this.loadPostsInitial(statuses);
    }
  };

  makeApiCall = async () => {
    // // Make an API call to the People API, and print the user's given name.
    // var request = window.gapi.client.request({
    //     'path': '/drive/v2/files?q=trashed=false ' +
    //             'and ( '+
    //               'mimeType contains "application/rtf" or ' +
    //               'mimeType contains "application/pdf" or ' +
    //               'mimeType contains "application/vnd.openxmlformats-officedocument.wordprocessingml.document" or ' +
    //               'mimeType contains "application/msword" ' +
    //             ')',
    //     'method': 'GET',
    //     'params': {'maxResults': '50'}
    //     });

    // request.execute((resp) => {  
    //   console.log('resp',resp);
          
    // }


    const { myBlog, myPosts } = await this.loadPostsInitial();

    console.log('myBlog.id', myBlog.id);
    console.log('myBlog',myBlog);

    try {
      const response = await fetchJsonp(`${myBlog.url.replace(/^http:\/\//i, 'https://')}feeds/posts/summary?alt=json&max-results=0&callback=cat`, { jsonpCallbackFunction: 'cat' });
      const data = await response.json();
      const existingLabels = data.feed.category.map((category) => category.term);
      this.setState({
        existingLabels,
      })
    } catch (e) {
      // alert(`There has been an error while loading labels! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);      
    }


  //   // -------- IVAN COPY-PASTE THIS -------- 
  //   let myFirstPost;
  //   try {
  //     myFirstPost = await Posts.get(myBlog.id, myPosts.items[0].id);
  //     console.log('my post #1', myFirstPost);
  //   } catch (e) {
  //     console.log('e',e)
  //     alert(`There has been an error while loading a post on your blog! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
  //   }
  //   // --------------------------------------


  //   // -------- IVAN COPY-PASTE THIS -------- 
  //   try {
  //     const currentMoment1 = moment()
  //     const updatedPost = await Posts.updateAndPossiblyRevertToDraft(
  //       myBlog.id, 
  //       { ...myFirstPost, title: `Random title ${Math.random()}`, updated: currentMoment1.toISOString()}, 
  //       Math.round(Math.random())
  //     );

  //     console.log('my post #1 updated', updatedPost);      
  //   } catch (e) {
  //     console.log('e',e)
  //     alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
  //   }
  //   // --------------------------------------




  //   // -------- IVAN COPY-PASTE THIS -------- 
  //   try {
  //     const deletedPost = await Posts.delete(myBlog.id, myFirstPost.id);
  //     console.log('deletedPost', deletedPost);
  //   } catch (e) {
  //     console.log('e',e)
  //     alert(`There has been an error while deleting blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
  //   }
  //   // --------------------------------------
  };


  schedulePost = () => {
    console.log('scheudle pressed! !');
  }

  render() {
    return this.state.isSignedIn ? (
      <Navigation
        onLogoutClick={this.signOut}
        selectedBlog={this.state.selectedBlog}
        posts={this.state.posts}
        existingLabels={this.state.existingLabels}
        postsCount={this.state.postsCount}
        loadPostsNext={() => this.loadPostsNext()}
        schedulePost={this.schedulePost}/>
    ) : (
      (
        <div>
          {/* {this.state.isInitialLoading? <div> LOADING......</div> : <span></span>} */}
          <FirstLogin isInitialLoading={this.state.isInitialLoading} onSignInClick={this.signIn} />
        </div>
      )
    )
  }
}

export default App;
