import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Add from './Add';
import Profile from './Profile';
import './nav.css';
import MessageModal from './Modal';

class Navigation extends Component {

  onLogoutClick = () => {
    this.modal.openModal();
  }

  render() {
    const { posts, postsCount, loadPostsNext, onLogoutClick } = this.props;
    return (
      <Router>
        <div>
          <MessageModal 
            ref={modal => this.modal = modal}
            onLeftActionClick={onLogoutClick}
            leftActionText="Yes"
            rightActionText="Cancel"
            message="Are you sure you want to"
            mainMessage="log out?"
            leftActionClassName="button-secondary button-ghost button-alert"
            rightActionClassName="button-main button-alert"
          />
          <nav className="nav">
            <Link to="/" className="nav-icon" title="Home">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/Add" className="nav-icon" title="Add">
              <i className="fas fa-plus-circle"></i>
            </Link>
            <button className="nav-icon button-logout" onClick={this.onLogoutClick}>
              <i className="fas fa-user"></i>
              <span className="nav-logout-text">Logout</span>
            </button>
          </nav>
          <div className="main">
            <Route exact path="/" component={() => (
              <Home posts={posts} postsCount={postsCount} loadPostsNext={loadPostsNext} />
            )} />
            <Route exact path="/Add" component={Add} />
            <Route path="/Profile" component={Profile} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Navigation;
