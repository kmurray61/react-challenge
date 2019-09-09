const { isObject, isEmpty, isString, isRegExp } = require("lodash");
const allComments = require("./0.json");
const commentKeys = ["author", "timestamp", "content"];

module.exports = {
  default: allComments,
  getComment(shape) {
    if (!isObject(shape)) {
        return null;
    }

    if (isEmpty(shape)) {
        return null;
    }

    for ( const comment of allComments) {
        const matchFound = commentKeys.some(key => {
        const expectation = comment[key];

        if (expectation) {
          const subject = comment[key];

          switch (true) {
            case isString(expectation): {
              return subject === expectation;
            }
            case isRegExp(expectation): {
              return expectation.test(subject);
            }
            default:
              // do nothing
          }
        }

        return true;
      });

      if (matchFound) {
        return comment;
      }
    }
  },
  addComment(author, content) {
    if (!author || !content) {
      return false;
    }

    allComments.push({
      author,
      content,
      timestamp: Date.now()
    });

    return true;
  }
};
