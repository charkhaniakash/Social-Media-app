// @ts-nocheck
import { useQuery, gql } from "@apollo/client";
import {
  Grid,
  GridColumn,
  GridRow,
  Header,
  TransitionGroup,
} from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import PostForm from "../components/PostForm";

const GET_POSTS_DATA = gql`
  {
    getPosts {
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
const Home = () => {
  const {
    loading,
    error,
    data: { getPosts: posts } = {},
  } = useQuery(GET_POSTS_DATA);

  const { user } = useContext(AuthContext);

  return (
    <Grid container stackable columns={3} divided>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1" textAlign="center" style={{ marginBottom: "30px" }}>
           Akash Medium
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        {user && (
          <Grid.Column width={16}>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <Grid.Column>
            <Header as="h3" textAlign="center" color="grey">
              ...Loading
            </Header>
          </Grid.Column>
        ) : (
          <TransitionGroup>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Grid.Column key={post?.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} user={user} />
                </Grid.Column>
              ))
            ) : (
              <Grid.Column>
                <Header as="h3" textAlign="center" color="grey">
                  No posts available
                </Header>
              </Grid.Column>
            )}
          </TransitionGroup>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
