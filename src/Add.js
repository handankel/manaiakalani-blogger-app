import PostField from './PostField';
import React, { Component } from 'react';
import Editor from './Editor'
import {Blogs, Posts} from './api/blogger'
import * as moment from 'moment';
import { map } from 'lodash';

class Add extends Component {


    constructor(props) {
        super(props);

        this.state = {
            timePickerShown: false,
            title: props.title ? props.title : '',
            labels: props.labels ? props.labels : [],
        };
    }
    handleScheduleOnClick = () => {
        this.setState({
            timePickerShown: true
        })
        this.props.schedulePost(/* time moment */);
    };

    handlePublishClick = async () => {
        const content = this._editor.getValue();
        const { selectedBlog } = this.props;
        const { title, labels } = this.state;
        try {
          const currentMoment = moment(); // Change that the scheduled date moment
          const newPost = await Posts.insert(selectedBlog.id, {
            title,
            content,
            labels,
            published: currentMoment.toISOString(),
          });
          console.log('newPost', newPost);
        } catch (e) {
          console.log('e',e)
          alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
        }
    };

    render() {
        const {schedulePost, postId} = this.props;
        const pageTitle = postId ? 'Edit post' : 'Create a new post';
        return (
            <form>
                <header className="post-header">
                    <img src="/logo-horizontal.png" className="post-header-logo" alt="" />
                    <div className="post-header-buttons">
                        <button type="button" className="post-header-button">
                            <i className="fas fa-save"></i>
                            <span className="post-header-button-label">Save</span>
                        </button>
                        <button type="button" className="post-header-button">
                            <i className="fas fa-trash-alt"></i>
                            <span className="post-header-button-label">Delete</span>
                        </button>
                        <button type="button" className="post-header-button">
                            <i className="fas fa-eye"></i>
                            <span className="post-header-button-label">Preview</span>
                        </button>
                    </div>
                </header>
                <h2 className="post-page-title">{pageTitle}</h2>
                <div className="post-fields-wrapper">
                    <div className="post-main">
                        <PostField title="Title:" htmlFor="postTitle">
                            <input 
                                id="postTitle" 
                                type="text" 
                                className="post-title-input" 
                                value={this.state.title} 
                                onChange={ (e) => this.setState({ title: e.target.value }) } />
                        </PostField>
                        <Editor ref={c => this._editor = c } />
                    </div>
                    <div className="post-secondary">
                        <PostField title="Add Label:">
                            <select className="label-select">
                                {
                                    this.props.existingLabels && map(this.props.existingLabels, (existingLabel, i) => <option key={i}>
                                        { existingLabel }
                                    </option>)
                                }
                            </select>
                        </PostField>

                        <PostField title="Current Labels:">
                            <div>
                            { 
                                map(this.state.labels, (label, i) => {
                                    return (
                                        <div key={i}><span>×</span> {label}</div>
                                    );
                                })
                            }
                            </div>
                        </PostField>
                    </div>
                </div>
                <footer className="post-footer">
                    <button type="button" className="button-main button-spaced" onClick={this.handleScheduleOnClick}>Schedule</button>
                    <button type="button" className="button-secondary button-spaced" onClick={this.handlePublishClick}>Publish</button>
                </footer>
            </form>
        );
    }
}

export default Add;
