// @ts-nocheck
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
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";

const PostCard = ({ post }) => {
  console.log("post", post);
  const { user } = useContext(AuthContext);

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
        <LikeButton
          user={user}
          post={{ id: post.id, likes: post.likes, likeCount: post.likeCount }}
        />
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${post.id}`} onClick={commentOnPost}>
          <Button icon>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic pointing="left">
            {post.commentCount}
          </Label>
        </Button>

        {user && user.username === post.username && (
          <DeletePost postId={post.id} />
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
