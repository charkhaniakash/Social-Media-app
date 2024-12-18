import moment from "moment/moment";
import React from "react";
import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Button,
  Card,
  Image,
  Icon,
  Label,
} from "semantic-ui-react";

const PostCard = ({ post }) => {

  const likePost =()=>{
    console.log("Liked")
  }
  const commentOnPost =()=>{
    console.log("commented")
  }
  console.log("post", post);
  return (
    <Card>
      <CardContent>
        <Image
          floated="right"
          size="mini"
          src="/images/avatar/large/molly.png"
        />
        <CardHeader>{post.username}</CardHeader>
        <CardMeta>{moment(post.createdAt).fromNow()}</CardMeta>
        <CardDescription>{post.body}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button icon>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic pointing="left">
            {post.likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button icon>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic pointing="left">
            {post.commentCount}
          </Label>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
