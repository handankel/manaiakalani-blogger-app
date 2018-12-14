import PostField from './PostField';
import React, { Component } from 'react';
import Editor from './Editor'
import {Blogs, Posts} from './api/blogger'
import * as moment from 'moment';
import { map, uniq, difference } from 'lodash';
import { Redirect } from 'react-router'
import MessageModal from './Modal';
import * as Datetime from 'react-datetime';
import './react-datetime.css'
export const ALL_AUDIO_MIME_TYPES='audio/flac,audio/mpegurl,audio/mp4,audio/mpeg,audio/ogg,audio/x-scpls,audio/wav,audio/webm,audio/x-ms-wma,application/xspf+xml,audio/x-mpeg,audio/mp3,audio/x-mp3,audio/mpeg3,audio/x-mpeg3,audio/mpg,audio/x-mpg,audio/x-mpegaudio,audio/1d-interleaved-parityfec,audio/32kadpcm,audio/3gpp,audio/3gpp2,audio/aac,audio/ac3,audio/AMR,audio/AMR-WB,audio/amr-wb+,audio/aptx,audio/asc,audio/ATRAC-ADVANCED-LOSSLESS,audio/ATRAC-X,audio/ATRAC3,audio/basic,audio/BV16,audio/BV32,audio/clearmode,audio/CN,audio/DAT12,audio/dls,audio/dsr-es201108,audio/dsr-es202050,audio/dsr-es202211,audio/dsr-es202212,audio/DV,audio/DVI4,audio/eac3,audio/encaprtp,audio/EVRC,audio/EVRC-QCP,audio/EVRC0,audio/EVRC1,audio/EVRCB,audio/EVRCB0,audio/EVRCB1,audio/EVRCNW,audio/EVRCNW0,audio/EVRCNW1,audio/EVRCWB,audio/EVRCWB0,audio/EVRCWB1,audio/EVS,audio/example,audio/fwdred,audio/G711-0,audio/G719,audio/G7221,audio/G722,audio/G723,audio/G726-16,audio/G726-24,audio/G726-32,audio/G726-40,audio/G728,audio/G729,audio/G729D,audio/G729E,audio/GSM,audio/GSM-EFR,audio/GSM-HR-08,audio/iLBC,audio/ip-mr_v2.5,audio/L8,audio/L16,audio/L20,audio/L24,audio/LPC,audio/MELP,audio/MELP600,audio/MELP1200,audio/MELP2400,audio/mobile-xmf,audio/MPA,audio/MP4A-LATM,audio/mpa-robust,audio/mpeg4-generic,audio/opus,audio/PCMA,audio/PCMA-WB,audio/PCMU,audio/PCMU-WB,audio/prs.sid,audio/raptorfec,audio/RED,audio/rtp-enc-aescm128,audio/rtploopback,audio/rtp-midi,audio/rtx,audio/SMV,audio/SMV0,audio/SMV-QCP,audio/sp-midi,audio/speex,audio/t140c,audio/t38,audio/telephone-event,audio/tone,audio/UEMCLIP,audio/ulpfec,audio/usac,audio/VDVI,audio/VMR-WB,audio/vnd.3gpp.iufp,audio/vnd.4SB,audio/vnd.audiokoz,audio/vnd.CELP,audio/vnd.cisco.nse,audio/vnd.cmles.radio-events,audio/vnd.cns.anp1,audio/vnd.cns.inf1,audio/vnd.dece.audio,audio/vnd.digital-winds,audio/vnd.dlna.adts,audio/vnd.dolby.heaac.1,audio/vnd.dolby.heaac.2,audio/vnd.dolby.mlp,audio/vnd.dolby.mps,audio/vnd.dolby.pl2,audio/vnd.dolby.pl2x,audio/vnd.dolby.pl2z,audio/vnd.dolby.pulse.1,audio/vnd.dra,audio/vnd.dts,audio/vnd.dts.hd,audio/vnd.dvb.file,audio/vnd.everad.plj,audio/vnd.hns.audio,audio/vnd.lucent.voice,audio/vnd.ms-playready.media.pya,audio/vnd.nokia.mobile-xmf,audio/vnd.nortel.vbk,audio/vnd.nuera.ecelp4800,audio/vnd.nuera.ecelp7470,audio/vnd.nuera.ecelp9600,audio/vnd.octel.sbc,audio/vnd.presonus.multitrack,audio/vnd.qcelp,audio/vnd.rhetorex.32kadpcm,audio/vnd.rip,audio/vnd.sealedmedia.softseal-mpeg,audio/vnd.vmx.cvsd,audio/vorbis,audio/vorbis-config,audio/adpcm,audio/amr,audio/amr-wb,audio/atrac-advanced-lossless,audio/atrac-x,audio/atrac3,audio/bv16,audio/bv32,audio/cn,audio/dat12,audio/dv,audio/dvi4,audio/evrc,audio/evrc-qcp,audio/evrc0,audio/evrc1,audio/evrcb,audio/evrcb0,audio/evrcb1,audio/evrcwb,audio/evrcwb0,audio/evrcwb1,audio/g719,audio/g722,audio/g7221,audio/g723,audio/g726-16,audio/g726-24,audio/g726-32,audio/g726-40,audio/g728,audio/g729,audio/g7291,audio/g729d,audio/g729e,audio/gsm,audio/gsm-efr,audio/gsm-hr-08,audio/ilbc,audio/isac,audio/l16,audio/l20,audio/l24,audio/l8,audio/lpc,audio/midi,audio/mp4a-latm,audio/mpa,audio/musepack,audio/parityfec,audio/pcma,audio/pcma-wb,audio/pcmu-wb,audio/pcmu,audio/qcelp,audio/red,audio/s3m,audio/silk,audio/smv,audio/smv0,audio/smv-qcp,audio/uemclip,audio/vdvi,audio/vmr-wb,audio/vnd.4sb,audio/vnd.celp,audio/vnd.sealedmedia.softseal.mpeg,audio/x-aac,audio/x-aiff,audio/x-caf,audio/x-flac,audio/x-matroska,audio/x-mpegurl,audio/x-ms-wax,audio/x-pn-realaudio,audio/x-pn-realaudio-plugin,audio/x-tta,audio/x-wav,audio/xm,audio/aiff,audio/x-au,audio/make,audio/x-gsm,audio/it,audio/x-jam,audio/nspaudio,audio/x-nspaudio,audio/x-liveaudio,audio/x-mpequrl,audio/x-mid,audio/x-midi,audio/x-vnd.audioexplosion.mjuicemediafile,audio/mod,audio/x-mod,audio/x-mpeg-3,application/x-vnd.audioexplosion.mzz,audio/make.my.funk,audio/x-realaudio,audio/mid,audio/x-psid,audio/x-adpcm,audio/tsp-audio,audio/tsplayer,audio/voc,audio/x-voc,audio/voxware,audio/x-twinvq-plugin,audio/x-twinvq';

var secret = require('./secret.json')
// Hard coding those is fine. As long as we don't put api secret here!!!
export const APP_ID = secret.APP_ID;
export const API_KEY = secret.API_KEY;
export const CLIENT_ID = secret.CLIENT_ID;
export const SCOPE = 'profile email https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/drive.file';


function strip(html){
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

function iframeModifier(string, toIframe){ //toIframe is a boolean that determines whether we're replacing the img tags with iframes (if true) or vice-versa
	var searchStart = 0;
	while (true) {
		if (toIframe){
			let tagStart = string.indexOf('<img ', searchStart);
			if (tagStart < 0) {
				break;
			}
			var tagEnd = string.indexOf(">", tagStart) + 1;
			let tagString = string.slice(tagStart, tagEnd);
			let dataIndex = tagString.indexOf('data-id');
			if (dataIndex >= 0){
				let idStart = tagString.indexOf('"',dataIndex) + 1;
				let idEnd = tagString.indexOf('"', idStart);
				let iframeValue = `<iframe data-id="${tagString.slice(idStart, idEnd)}" src="https://drive.google.com/file/d/${tagString.slice(idStart, idEnd)}/preview" width="480" height="360"></iframe>`;
				let originalLength = string.length;
				string = (string.slice(0, tagStart) + iframeValue + string.slice(tagEnd));
				tagEnd = tagEnd + (string.length - originalLength);
			}
			searchStart = tagEnd;
		}
		else{
			let tagStart = string.indexOf('<iframe ', searchStart);
			if (tagStart < 0) {
				break;
			}
			var tagEnd = string.indexOf("</", tagStart);
			tagEnd = string.indexOf(">", tagEnd) + 1;
			let tagString = string.slice(tagStart, tagEnd);
			let dataIndex = tagString.indexOf('data-id');
			if (dataIndex >= 0){
				let idStart = tagString.indexOf('"',dataIndex) + 1;
				let idEnd = tagString.indexOf('"', idStart);
				let imgValue = `<img data-id="${tagString.slice(idStart, idEnd)}" src="https://drive.google.com/thumbnail?id=${tagString.slice(idStart, idEnd)}&sz=w480-h360"/>`;
				let originalLength = string.length;
				string = (string.slice(0, tagStart) + imgValue + string.slice(tagEnd));
				tagEnd = tagEnd + (string.length - originalLength);
			}
			searchStart = tagEnd;
		}
	}
	return string;
}

function insertPermission(fileId) {
  var body = {
    'type': "anyone",
    'role': "reader"
  };
  window.gapi.client.load('drive', 'v2', function() {
  var request = window.gapi.client.drive.permissions.insert({
    'fileId': fileId,
    'resource': body
  });
  request.execute(function(resp) { });
  });
}

var curDate = new Date();

class Add extends Component {


    constructor(props) {
        super(props);

        this.state = {
            activeModal: null,
            timePickerShown: false,
            title: props.title ? props.title : '',
            content: props.content ? iframeModifier(props.content, false) : '',
            fileContent: '',
            labels: props.labels ? props.labels : [],
            redirectToPosts: false,
			date: curDate,
        };
    }
	handleDate = (date) =>{
		this.setState({date});
		console.log(moment(this.state.date).toISOString());
	};
    getModal(activeModal) {
        switch(activeModal) {
            case 'DELETE':
                return (
                    <MessageModal 
                        ref={modal => this.modal = modal}
                        onLeftActionClick={this.handleDeleteClick}
                        leftActionText="Yes"
                        rightActionText="Cancel"
                        message="Are you sure you want to"
                        mainMessage="delete this post?"
                        leftActionClassName="button-secondary button-ghost button-alert"
                        rightActionClassName="button-main button-alert"
                        alertBodyColorClassName="alert-body-red"
                    />
                )
            case 'PUBLISH':
                return (
                    <MessageModal 
                        ref={modal => this.modal = modal}
                        onLeftActionClick={this.handlePublishClick}
                        leftActionText="Yes"
                        rightActionText="Cancel"
                        message="Are you sure you want to"
                        mainMessage="publish this post?"
                        leftActionClassName="button-secondary button-ghost button-alert"
                        rightActionClassName="button-main button-alert"
                        alertBodyColorClassName="alert-body-green"
                    />
                )
        }
    }
	handleDeleteClick = async () => {
		const { selectedBlog, id } = this.props;
		try {
			if (!(this.props.id)){
				throw new Error('Post hasn\'t been published');			
			}
			await Posts.delete(selectedBlog.id, id);
			window.location = '/';
        } catch (error) {
			alert(`There has been an error while deleting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${error.message}`);
			console.error('error', error);
        }
	};
    handleScheduleOnClick = () => {
        this.setState({
            timePickerShown: !this.state.timePickerShown
        });
		
    };

    handlePublishClick = async () => {
        let content = this._editor.getValueHtml() //+ this.state.fileContent;
        const { selectedBlog, id } = this.props;
        const { title, labels } = this.state;
		var currentMoment = moment(this.state.date).toISOString();

        if (!title || !strip(content)) {
            return alert('Please fill out title and the content of the post.');
        }


        try {
		  if (this.props.status == 'SCHEDULED'){
			  let postInfo = await Posts.get(selectedBlog.id, id);
			  currentMoment = postInfo.published;
		  }
		  
		  content = iframeModifier(content, true); //replaces specific image tags with iframes for the post
		  
          const postData = {
            id,
            title,
            content,
            labels,
            published: currentMoment,
          };

          let post;
          if (this.props.id) {
              post = await Posts.updateAndPossiblyRevertToDraft(selectedBlog.id, postData, false);
          } else {        
              post = await Posts.insert(selectedBlog.id, postData, false);
          }

          if (!(post && post.id)) {
            throw new Error('Post hasn\'t been published');
          }

          // this.setState({
          //   redirectToPosts: true,
          // })
          window.location = '/';
        } catch (error) {
          alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${error.message}`);
          console.error('error', error);
        }
    };

    handleSaveAsDraftClick = async () => {
        let content = this._editor.getValueHtml() //+ this.state.fileContent;
        const { selectedBlog, id } = this.props;
        const { title, labels } = this.state;

        if (!title || !strip(content)) {
            return alert('Please fill out title and the content of the post.');
        }

        try {
          const currentMoment = moment();// Change that the scheduled date moment
		  content = iframeModifier(content, true);
          const postData = {
            id,
            title,
            content,
            labels,
            published: currentMoment.toISOString(),
          };

          let post;
          if (this.props.id) {
              post = await Posts.updateAndPossiblyRevertToDraft(selectedBlog.id, postData, true);
          } else {        
              post = await Posts.insert(selectedBlog.id, postData, true);
          }

          if (!(post && post.id)) {
            throw new Error('Post hasn\'t been saved as draft');
          }

          // this.setState({
          //   redirectToPosts: true,
          // })
          window.location = '/';
        } catch (error) {
          alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${error.message}`);
          console.error('error', error);
        }
    };

    labelSelect = (event) => {
        this.setState({
            labels: uniq([...this.state.labels, event.target.value])
        });
    };

    labelRemove = (label) => {
        this.setState({
            labels: difference(this.state.labels, [label])
        });
    };

    setActiveModal = (modalName) => {
        return () => {
            this.setState({
                activeModal: modalName
            }, () => {
                this.modal.openModal();
            });
        }
    }

    popFilePicker = () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        const GoogleUser = GoogleAuth.currentUser.get();
        const authResponse = GoogleUser.getAuthResponse(true);
        const { access_token } = authResponse;
        console.log('GoogleAuth', GoogleAuth);
        console.log('GoogleUser', GoogleUser);
        console.log('authResponse', authResponse);
        console.log('access_token', access_token);

        var view = new window.google.picker.View(window.google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS);
        view.setMimeTypes(ALL_AUDIO_MIME_TYPES);
		var year = new Date().getFullYear();
		view.setQuery("after:" + year + "-01-01 ");
        var picker = new window.google.picker.PickerBuilder()
            .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
            .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(APP_ID)
            .setOAuthToken(access_token)
            .addView(view)
            .addView(new window.google.picker.DocsUploadView())
            .setDeveloperKey(API_KEY)
            .setCallback((data) => {
              if (data.action === 'picked') {
                //const fileContent = `${this.state.content}\n<iframe src="${data.docs[0].embedUrl}" width="640" height="480"></iframe>` ;
				for (var image in data.docs) {
					var fileId = data.docs[image].id;
					window.gapi.client.load('drive', 'v2', function() {
						insertPermission(fileId)
					});
					if (data.docs[image].type != 'photo'){
						this._editor.insertText(fileId, true);
					}
					else{
						this._editor.insertText(fileId, false);
					}
				}
              }
            })
            .build();
         picker.setVisible(true);
    }

    render() {
        const {schedulePost, id, title, status} = this.props;
        const {redirectToPosts, content, activeModal, timePickerShown} = this.state;
        const pageTitle = id ? 'Edit post' : 'Create a new post';
		let pickerDate = new Date();
		pickerDate.setHours(13);
		pickerDate.setMinutes(0);
        if (redirectToPosts) {
           return <Redirect to='/'/>;
        }
        return (
            <form onSubmit={(e) => { this.handlePublishClick(); e.preventDefault(); return false }}>
                {this.getModal(activeModal)}
                <header className="post-header">
                    <img src="/logo-horizontal.png" className="post-header-logo" alt="" />
                    <div className="post-header-buttons">
                        <button type="button" className="post-header-button" onClick={this.handleSaveAsDraftClick}>
                            <i className="fas fa-save"></i>
                            <span className="post-header-button-label">{status == 'DRAFT' || !status ? 'Save' : 'Revert to Draft'}</span>
                        </button>
                        <button type="button" className="post-header-button" onClick={this.setActiveModal('DELETE')}>
                            <i className="fas fa-trash-alt"></i>
                            <span className="post-header-button-label">Delete</span>
                        </button>
{/*
                        <button type="button" className="post-header-button">
                            <i className="fas fa-eye"></i>
                            <span className="post-header-button-label">Preview</span>
                        </button>
*/}

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
                        <Editor
                            content={content}
                            ref={c => this._editor = c }
                        />

                        <button type="button" className="button-main button-spaced" onClick={this.popFilePicker}>Attach File</button>

                    </div>
                    <div className="post-secondary">
                        <PostField title="Add Label:">
                            <select className="label-select" value='' onChange={this.labelSelect}>
                                {
                                    this.props.existingLabels && map(['', ...this.props.existingLabels], (existingLabel, i) => {
                                        return <option value={existingLabel} key={i} disabled={existingLabel === '' ? true : false}>
                                            { existingLabel === '' ? 'Select a label' : existingLabel }
                                        </option>
                                    })
                                }
                            </select>
                        </PostField>

                        <PostField title="Current Labels:">
                            <div>
                            { 
                                map(this.state.labels, (label, i) => {
                                    return (
                                        <div key={i}><button type="button" onClick={ () => this.labelRemove(label) }>×</button> {label}</div>
                                    );
                                })
                            }
                            </div>
                        </PostField>
						
						<PostField title="Select Date And Time:" htmlFor="dateAndTime" hidden={ status == 'SCHEDULED' || status == 'DRAFT' || !id ? "" : "hidden"}>
							<Datetime 
								inputProps={{style: {'border': 'none', 'width': '100%', 'padding' : '10px', 'font-size' : '16px'}, id : 'dateAndTime', readonly: 'readonly'}} 
								onChange={this.handleDate} dateFormat="DD/MM/YYYY" 
								defaultValue={pickerDate} 
								input={status == 'SCHEDULED' || status == 'DRAFT' || !id ? true : false}/>
						</PostField>
						
                    </div>
                </div>
				
                <footer className="post-footer">
					<button type="button" className="button-main button-spaced" hidden /*hidden={ status == 'SCHEDULED' || status == 'DRAFT' || !id ? "" : "hidden"}*/ onClick={this.handleScheduleOnClick}>Schedule</button>
                    <button type="button" className="button-secondary button-spaced" onClick={this.setActiveModal('PUBLISH')}>{ status == 'DRAFT' || !id ? 'Publish' : 'Update'} </button>
                </footer>
            </form>
        );
    }
}

export default Add;

Add.defaultProps = {
    postTitle: '',
    labels: []
};
