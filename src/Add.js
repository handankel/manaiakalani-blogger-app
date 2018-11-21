import PostField from './PostField';
import React, { Component } from 'react';
import Editor from './Editor'
import {Blogs, Posts} from './api/blogger'
import * as moment from 'moment';
import { map, uniq, difference } from 'lodash';
import { Redirect } from 'react-router'
import MessageModal from './Modal';


export const ALL_AUDIO_MIME_TYPES='audio/flac,audio/mpegurl,audio/mp4,audio/mpeg,audio/ogg,audio/x-scpls,audio/wav,audio/webm,audio/x-ms-wma,application/xspf+xml,audio/x-mpeg,audio/mp3,audio/x-mp3,audio/mpeg3,audio/x-mpeg3,audio/mpg,audio/x-mpg,audio/x-mpegaudio,audio/1d-interleaved-parityfec,audio/32kadpcm,audio/3gpp,audio/3gpp2,audio/aac,audio/ac3,audio/AMR,audio/AMR-WB,audio/amr-wb+,audio/aptx,audio/asc,audio/ATRAC-ADVANCED-LOSSLESS,audio/ATRAC-X,audio/ATRAC3,audio/basic,audio/BV16,audio/BV32,audio/clearmode,audio/CN,audio/DAT12,audio/dls,audio/dsr-es201108,audio/dsr-es202050,audio/dsr-es202211,audio/dsr-es202212,audio/DV,audio/DVI4,audio/eac3,audio/encaprtp,audio/EVRC,audio/EVRC-QCP,audio/EVRC0,audio/EVRC1,audio/EVRCB,audio/EVRCB0,audio/EVRCB1,audio/EVRCNW,audio/EVRCNW0,audio/EVRCNW1,audio/EVRCWB,audio/EVRCWB0,audio/EVRCWB1,audio/EVS,audio/example,audio/fwdred,audio/G711-0,audio/G719,audio/G7221,audio/G722,audio/G723,audio/G726-16,audio/G726-24,audio/G726-32,audio/G726-40,audio/G728,audio/G729,audio/G729D,audio/G729E,audio/GSM,audio/GSM-EFR,audio/GSM-HR-08,audio/iLBC,audio/ip-mr_v2.5,audio/L8,audio/L16,audio/L20,audio/L24,audio/LPC,audio/MELP,audio/MELP600,audio/MELP1200,audio/MELP2400,audio/mobile-xmf,audio/MPA,audio/MP4A-LATM,audio/mpa-robust,audio/mpeg4-generic,audio/opus,audio/PCMA,audio/PCMA-WB,audio/PCMU,audio/PCMU-WB,audio/prs.sid,audio/raptorfec,audio/RED,audio/rtp-enc-aescm128,audio/rtploopback,audio/rtp-midi,audio/rtx,audio/SMV,audio/SMV0,audio/SMV-QCP,audio/sp-midi,audio/speex,audio/t140c,audio/t38,audio/telephone-event,audio/tone,audio/UEMCLIP,audio/ulpfec,audio/usac,audio/VDVI,audio/VMR-WB,audio/vnd.3gpp.iufp,audio/vnd.4SB,audio/vnd.audiokoz,audio/vnd.CELP,audio/vnd.cisco.nse,audio/vnd.cmles.radio-events,audio/vnd.cns.anp1,audio/vnd.cns.inf1,audio/vnd.dece.audio,audio/vnd.digital-winds,audio/vnd.dlna.adts,audio/vnd.dolby.heaac.1,audio/vnd.dolby.heaac.2,audio/vnd.dolby.mlp,audio/vnd.dolby.mps,audio/vnd.dolby.pl2,audio/vnd.dolby.pl2x,audio/vnd.dolby.pl2z,audio/vnd.dolby.pulse.1,audio/vnd.dra,audio/vnd.dts,audio/vnd.dts.hd,audio/vnd.dvb.file,audio/vnd.everad.plj,audio/vnd.hns.audio,audio/vnd.lucent.voice,audio/vnd.ms-playready.media.pya,audio/vnd.nokia.mobile-xmf,audio/vnd.nortel.vbk,audio/vnd.nuera.ecelp4800,audio/vnd.nuera.ecelp7470,audio/vnd.nuera.ecelp9600,audio/vnd.octel.sbc,audio/vnd.presonus.multitrack,audio/vnd.qcelp,audio/vnd.rhetorex.32kadpcm,audio/vnd.rip,audio/vnd.sealedmedia.softseal-mpeg,audio/vnd.vmx.cvsd,audio/vorbis,audio/vorbis-config,audio/adpcm,audio/amr,audio/amr-wb,audio/atrac-advanced-lossless,audio/atrac-x,audio/atrac3,audio/bv16,audio/bv32,audio/cn,audio/dat12,audio/dv,audio/dvi4,audio/evrc,audio/evrc-qcp,audio/evrc0,audio/evrc1,audio/evrcb,audio/evrcb0,audio/evrcb1,audio/evrcwb,audio/evrcwb0,audio/evrcwb1,audio/g719,audio/g722,audio/g7221,audio/g723,audio/g726-16,audio/g726-24,audio/g726-32,audio/g726-40,audio/g728,audio/g729,audio/g7291,audio/g729d,audio/g729e,audio/gsm,audio/gsm-efr,audio/gsm-hr-08,audio/ilbc,audio/isac,audio/l16,audio/l20,audio/l24,audio/l8,audio/lpc,audio/midi,audio/mp4a-latm,audio/mpa,audio/musepack,audio/parityfec,audio/pcma,audio/pcma-wb,audio/pcmu-wb,audio/pcmu,audio/qcelp,audio/red,audio/s3m,audio/silk,audio/smv,audio/smv0,audio/smv-qcp,audio/uemclip,audio/vdvi,audio/vmr-wb,audio/vnd.4sb,audio/vnd.celp,audio/vnd.sealedmedia.softseal.mpeg,audio/x-aac,audio/x-aiff,audio/x-caf,audio/x-flac,audio/x-matroska,audio/x-mpegurl,audio/x-ms-wax,audio/x-pn-realaudio,audio/x-pn-realaudio-plugin,audio/x-tta,audio/x-wav,audio/xm,audio/aiff,audio/x-au,audio/make,audio/x-gsm,audio/it,audio/x-jam,audio/nspaudio,audio/x-nspaudio,audio/x-liveaudio,audio/x-mpequrl,audio/x-mid,audio/x-midi,audio/x-vnd.audioexplosion.mjuicemediafile,audio/mod,audio/x-mod,audio/x-mpeg-3,application/x-vnd.audioexplosion.mzz,audio/make.my.funk,audio/x-realaudio,audio/mid,audio/x-psid,audio/x-adpcm,audio/tsp-audio,audio/tsplayer,audio/voc,audio/x-voc,audio/voxware,audio/x-twinvq-plugin,audio/x-twinvq';

// Hard coding those is fine. As long as we don't put api secret here!!!
export const APP_ID = '73937277661';
export const API_KEY = 'AIzaSyCmRkmKNSeXjc1G-unu05DZ48eISHCgxjY';
export const CLIENT_ID = '73937277661-o8dtit2phfpkgquui5keub2nff9b09c8.apps.googleusercontent.com';
export const SCOPE = 'profile email https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/drive.file';


function strip(html){
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
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

class Add extends Component {


    constructor(props) {
        super(props);

        this.state = {
            activeModal: null,
            timePickerShown: false,
            title: props.title ? props.title : '',
            content: props.content ? props.content : '',
            fileContent: '',
            labels: props.labels ? props.labels : [],
            redirectToPosts: false,
        };
    }

    getModal(activeModal) {
        switch(activeModal) {
            case 'DELETE':
                return (
                    <MessageModal 
                        ref={modal => this.modal = modal}
                        //onLeftActionClick={}
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

    handleScheduleOnClick = () => {
        this.setState({
            timePickerShown: true
        })
        this.props.schedulePost(/* time moment */);
    };

    handlePublishClick = async () => {
        const content = this._editor.getValueHtml() + this.state.fileContent;
        const { selectedBlog, id } = this.props;
        const { title, labels } = this.state;

        if (!title || !strip(content)) {
            return alert('Please fill out title and the content of the post.');
        }

        try {
          const currentMoment = moment(); // Change that the scheduled date moment
          const postData = {
            id,
            title,
            content,
            labels,
            published: currentMoment.toISOString(),
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
        const content = this._editor.getValueHtml() + this.state.fileContent;
        const { selectedBlog, id } = this.props;
        const { title, labels } = this.state;

        if (!title || !strip(content)) {
            return alert('Please fill out title and the content of the post.');
        }

        try {
          const currentMoment = moment(); // Change that the scheduled date moment
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
                const fileContent = `${this.state.content}\n<iframe src="${data.docs[0].embedUrl}" width="640" height="480"></iframe>` ;
				var fileId = data.docs[0].id;
				window.gapi.client.load('drive', 'v2', function() {
					insertPermission(fileId)
				});
                this.setState({ 
                    fileContent,
                });
              }
            })
            .build();
         picker.setVisible(true);
    }

    render() {
        const {schedulePost, id, title, status} = this.props;
        const {redirectToPosts, content, activeModal} = this.state;
        const pageTitle = id ? 'Edit post' : 'Create a new post';
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
                    </div>
                </div>
                <footer className="post-footer">
                    {/* <button type="button" className="button-main button-spaced" onClick={this.handleScheduleOnClick}>Schedule</button> */}
                    <button type="button" className="button-secondary button-spaced" onClick={this.setActiveModal('PUBLISH')}>{ id ? 'Update' : 'Publish'} </button>
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
