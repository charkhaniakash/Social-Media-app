import moment from "moment/moment";
import React, { useContext } from "react";
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
import { AuthContext } from "../context/authContext";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log("Liked");
  };
  const commentOnPost = () => {
    console.log("commented");
  };
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

        {user && user.username === post.username && (
          <Button as="div" labelPosition="right" onClick={() => console.log("Delete Post")}>
            <Button icon>
              <Icon name="trash" />
            </Button>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
