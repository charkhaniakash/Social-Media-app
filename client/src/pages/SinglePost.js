// @ts-nocheck
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { Form, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Grid,
  GridColumn,
  GridRow,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DeletePost from "../components/DeletePost";

const SinglePost = () => {
  const { postId } = useParams();

  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const [postComment, { loading }] = useMutation(POST_COMMENTS, {
    update(data) {
      setComment("");
      console.log(data)
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  let postContents;
  if (!getPost) {
    postContents = <p> ...Loading</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;


    postContents = (
      <Grid>
        <GridRow>
          <GridColumn width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </GridColumn>
          <GridColumn width={10}>
            <Card fluid>
              <CardContent>
                <CardHeader>{username}</CardHeader>
                <CardMeta>{moment(createdAt).fromNow()}</CardMeta>
                <CardDescription>{body}</CardDescription>
              </CardContent>
              <hr />
              <CardContent extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeletePost postId={id} />
                )}
              </CardContent>
            </Card>

            {user && (
              <Card fluid>
                <CardContent>
                  <p>Post a comment</p>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment.."
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={postComment}
                      className={`ui button teal ${loading ? "loading" : ""}`}
                    >
                      Submit
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {comments?.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeletePost postId={id} commentId={comment.id} />
                  )}
                  {/* {user && user.username === username && ( */}
                  {/* <DeletePost postId={id} commentId={comment.id} /> */}
                  {/* )} */}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }

  return postContents;
};

const POST_COMMENTS = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        createdAt
        body
        username
      }
    }
  }
`;

export default SinglePost;
