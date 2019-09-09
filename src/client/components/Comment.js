import React, { Fragment } from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import allComments from "../../data/comments";

let myHref = '#';
class DoComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newName: '',
            newComment: '',
            comments: [],
            content: [],
        };

        this.updateNewName = this.updateNewName.bind(this);
        this.updateNewComment = this.updateNewComment.bind(this);
        this.handleInsertComment = this.handleInsertComment.bind(this);
        this.addComment = this.addComment.bind(this);
    }
    addComment(author,contents) {
        this.setState((state) => ({
            comments: state.comments.concat([author]),
            content: state.content.concat([contents])
        }));
    }
    updateNewName(e) {
        this.setState({
            newName: e.target.value
        })
    }
    updateNewComment(e) {
        this.setState({
            newComment: e.target.value
        })
    }
    handleInsertComment() {
        if (this.state.newName && this.state.newComment) {
            allComments.addComment(this.state.newName, this.state.newComment);
            this.setState({
                newName: '',
                newComment: ''
            });
            this.props.addComment(this.state.newName,this.state.newComment);
        }
        else {
            alert("You have a blank input");
        }
    }
    render() {
        return (
            <Fragment>
                <Typography variant="h5" component="h3">
                    Add your comment.
                </Typography>
                <TextField
                    id="nameTxt"
                    label="Your Name"
                    value={this.state.newName}
                    onChange={this.updateNewName}
                    margin="normal"
                    helperText=""
                    variant="outlined"
                />
                <TextField
                    id="commentTxt"
                    label="Your Comment"
                    multiline
                    rowsMax="3"
                    value={this.state.newComment}
                    onChange={this.updateNewComment}
                    margin="normal"
                    helperText=""
                    variant="outlined"
                />
                <Button onClick={this.handleInsertComment} size="large" variant="contained" color="primary" href={myHref}>
                    Add Comment
                </Button>
            </Fragment>
        )
    }
}
export default DoComments;