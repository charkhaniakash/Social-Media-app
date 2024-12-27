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
  const { user } = useContext(AuthContext);

  return (
    <Card
      fluid
      style={{
        marginBottom: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Content
        as={Link}
        to={`/posts/${post.id}`}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          floated="left"
          size="tiny"
          src="/images/avatar/large/molly.png"
          style={{ borderRadius: "50%", marginRight: "15px" }}
        />
        <div>
          <Card.Header style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            {post.username}
          </Card.Header>
          <Card.Meta style={{ color: "gray" }}>
            {moment(post.createdAt).fromNow()}
          </Card.Meta>
          <Card.Description style={{ marginTop: "10px", fontSize: "1.1em" }}>
            {post.body}
          </Card.Description>
        </div>
      </Card.Content>
      <Card.Content
        extra
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LikeButton
          user={user}
          post={{ id: post.id, likes: post.likes, likeCount: post.likeCount }}
        />
        <Button
          labelPosition="right"
          as={Link}
          to={`/posts/${post.id}`}
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "20px",
            boxShadow: "none",
          }}
        >
          <Button icon>
            <Icon name="comments" style={{ color: "#4183c4" }} />
          </Button>
          <Label
            as="a"
            basic
            pointing="left"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            {post.commentCount}
          </Label>
        </Button>
        {user && user.username === post.username && (
          <DeletePost postId={post.id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
