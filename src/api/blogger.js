export const MAX_RESULTS_PER_PAGE = 10;
const debug = false;
export class Blogs {
  static _listByUser() {
    return new Promise((resolve, reject) => {
      window.gapi.client.request({
        path: '/blogger/v3/users/self/blogs',
        method: 'GET',
        params: {}
        // We are assuming user can't have too many of blogs
      }).then((resp) => {
        resolve(resp.result);
      }, (reason) => {
        reject(reason.result.error);
      });
    });
  } 

  // Tested manually by Ilia
  static async getMyFirstBlog() {
    const listByUserData = await Blogs._listByUser();
	if (debug){
		console.log('listByUserData',listByUserData)
	}
    const myBlogs = listByUserData.items;
    return myBlogs[0];
  }
}

export class Posts {

  // Tested manually by Ilia
  static list(blogId, status, nextPageToken) {
    return new Promise((resolve, reject) => {
      window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts`,
        method: 'GET',
        params: {
          maxResults: MAX_RESULTS_PER_PAGE,
          view: 'AUTHOR',
          orderBy: 'published',
          ...nextPageToken ? { pageToken: nextPageToken } : {},
          blogId,
          status,
        }
      }).then((resp) => {
        resolve(resp.result);
      }, (reason) => {
        reject(reason.result.error);
      });
    });
  }

  // Tested manually by Ilia
  static insert(blogId, { title, content, published, labels }, isDraft) {
    const post = {
      kind: "blogger#post",
      blog: {
        id: blogId
      },
      published,
      title,
      content,
      labels,
    };

    return new Promise((resolve, reject) => {
      window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts`,
        method: 'POST',
        params: {
          blogId,
          isDraft,
        },
        body: post,
      }).then((resp) => {
        resolve(resp.result);
      }, (reason) => {
        reject(reason.result.error);
      });
    });
  }

  // Tested manually by Ilia
  static updateAndPossiblyRevertToDraft(blogId, postData, isDraft) {
    const postId = postData.id;
    const post = postData;

    return new Promise((resolve, reject) => {
      window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts/${post.id}`,
        method: 'PUT',
        params: {
          blogId,
          postId,
          ...(isDraft ? {} : { publish: true })
        },
        body: post,
      }).then((resp) => {

        if (isDraft) {
          window.gapi.client.request({
            path: `/blogger/v3/blogs/${blogId}/posts/${post.id}/revert`,
            method: 'POST',
            params: {
              blogId,
              postId: post.id,
            },
          }).then((resp) => {
            resolve(resp.result);
          }, (reason) => {
            console.log('error here 1');
            reject(reason.result.error);
          });
        } else {
          resolve(resp.result);
        }
      }, (reason) => {
        console.log('error here 2');
        reject(reason.result.error);
      });
    });
  }

  // Tested manually by Ilia
  static delete(blogId, postId) {
    return new Promise((resolve, reject) => {
      window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts/${postId}`,
        method: 'DELETE',
        params: {
          blogId,
          postId,
        },
      }).then((resp) => {
        resolve(resp.result);
      }, (reason) => {
        reject(reason.result.error);
      });
    });
  }

  // Tested manually by Ilia
  static get(blogId, postId) {
    return new Promise((resolve, reject) => {
      window.gapi.client.request({
        path: `/blogger/v3/blogs/${blogId}/posts/${postId}`,
        method: 'GET',
        params: {
          view: 'AUTHOR',
          blogId,
          postId,
        },
      }).then((resp) => {
        resolve(resp.result);
      }, (reason) => {
        reject(reason.result.error);
      });
    });
  }


}
