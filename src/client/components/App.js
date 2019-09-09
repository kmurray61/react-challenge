import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";
import HamiltonJpg from "../assets/meow.jpg";
import { toggleModal } from "../store/actions";
import DoComments from "./Comment";
import allComments from "../../data/comments";

let comment = {author:'',timestamp:'',content:''};
let comments = [];

class App extends Component {
    static propTypes = {
        classes: PropTypes.object,
        isAddingComment: PropTypes.bool,
        doToggleModal: PropTypes.func
    };

    static defaultProps = {
        isAddingComment: false
    };
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
        this.addContents = this.addContents.bind(this);
        this.getComments();
    }
    addComment(author,comment) {
        this.addContents(author,comment);
        this.props.doToggleModal();
    }
    getComments() {
        comments.push(allComments.getComment(comment));
        for ( let i in comments ) {
            if ( comments.hasOwnProperty(i) ) {
                comments[i].timestamp = this.formatTS(comments[i].timestamp);
            }
        }
    }
    addContents(author,contents) {
        comment = {author:decodeURIComponent(author),timestamp:this.formatTS(Date.now()),content:decodeURIComponent(contents)};
        comments.push(comment);
    }
    formatTS(ts) {
        return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts);
    }
    render() {
        const { classes, isAddingComment, doToggleModal } = this.props;
        return (
          <Grid container>
            <Grid item xs={12} className={classes.title}>
              <Typography gutterBottom variant="h1">
                Meet Hamilton
              </Typography>
              <Paper
                component="img"
                src={HamiltonJpg}
                alt="Hamilton"
                className={classes.portrait}
                elevation={4}
              />
              <Typography gutterBottom variant="subtitle2">
                He's a pretty cool cat
              </Typography>
              <Button variant="contained" color="primary" onClick={doToggleModal}>
                Tell me what you think of Hamilton
              </Button>
              <Modal open={isAddingComment} onClose={doToggleModal}>
                <Paper className={classes.commentForm}>
                    <DoComments addComment={this.addComment}/>
                </Paper>
              </Modal>
                <ShowList/>
            </Grid>
          </Grid>
        );
    }
}

const list = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding:'10px',
    maxWidth:'50%',
    marginTop: '2%',
    marginLeft: '25%',
};
const listCell = {
    border:'solid 1px #000000',
    borderRadius:'4px',
    backgroundColor:'#F1F1F1',
    padding:'10px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom:'5px',
    minWidth:'400px',
    boxShadow: '3px 3px #888888',
    textAlign:'left',
    maxWidth:'400px',
};
const spacer = {
    width:'10px',
    height:'10px',
};
const smallStyle = {
    marginTop:'-20px',
    marginLeft:'65%',
    minWidth: '140px'
};
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const circleStyle = {
    border:'solid 1px #000000',
    borderRadius:'30px',
    width:'50px',
    height:'50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'30px',
    boxShadow: '2px 2px #888888',
    backgroundColor:'#F1F1F1',
};

class ShowList extends React.Component {
    render() {
        return (
            <div style={list}>
                <h3> [ Comments ] </h3>
                <div>
                    { comments.map(function(d, idx) {
                        return (
                            <Container key={idx}>
                                <Container style={containerStyle}>
                                    <Typography component="div" style={circleStyle}>{d.author.charAt(0)}</Typography>
                                    <Typography component="div" style={spacer}/>
                                    <Paper style={listCell}>
                                        {decodeURIComponent(d.author)}
                                        <small style={smallStyle}>{d.timestamp}</small>

                                        <Typography component="div" style={spacer}/>
                                        {decodeURIComponent(d.content)}
                                    </Paper>
                                </Container>
                            </Container>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default compose(
  withStyles(theme =>
    createStyles({
      title: {
        textAlign: "center"
      },
      portrait: {
        maxWidth: theme.spacing.unit * 48
      },
      commentForm: {
          position: 'absolute',
          width: '50%',
          height: '35%',
          maxWidth: '500px',
          minWidth: '400px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px;',
          boxSizing: 'content-box'
        }
    })
  ),
  connect(
    state => ({
      isAddingComment: state.isAddingComment
    }),
    dispatch => ({
      doToggleModal: () => dispatch(toggleModal())
    })
  )
)(App);