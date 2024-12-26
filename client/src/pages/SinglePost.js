import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Grid, GridColumn, GridRow, Icon, Image, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DeletePost from "../components/DeletePost";

const SinglePost = () => {
  const { postId } = useParams();

  console.log("id", postId);

  const {user} = useContext(AuthContext);

  const {data: { getPost} = {}} = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
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
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {user && user.username === username && <DeletePost postId ={id} />}
              </CardContent>
            </Card>
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }

  return postContents;
};

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
      }
    }
  }
`;


export default SinglePost;
