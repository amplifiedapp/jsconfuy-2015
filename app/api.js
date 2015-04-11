import Promise from "bluebird";
import assign from "object-assign";

export default {
  createComment(commentData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(assign({}, commentData, {
          user: {
            avatarUrl: "http://www.gravatar.com/avatar/1eb5eb46d5a4289d3528426b1626c2bb.png",
            fullName: "Sergio Rafael Gianazza"
          }
        }));
      }, 500);
    });
  }
};
