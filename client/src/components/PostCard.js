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
} from "semantic-ui-react";

const PostCard = ({ post }) => {
  console.log("post", post);
  return (
    <Card>
      <CardContent>
        <Image
          floated="right"
          size="mini"
          src="/images/avatar/large/molly.png"
        />
        <CardHeader>Molly Thomas</CardHeader>
        <CardMeta>New User</CardMeta>
        <CardDescription>
          Molly wants to add you to the group <strong>musicians</strong>
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Approve
          </Button>
          <Button basic color="red">
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
