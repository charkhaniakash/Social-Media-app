import { useQuery, gql } from "@apollo/client";
import { Grid, GridColumn, GridRow, TransitionGroup } from "semantic-ui-react";
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
    <Grid columns="three" divided>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>

      <GridRow>
        {user && (
          <Grid columns="one">
            <PostForm />
          </Grid>
        )}

        {loading ? (
          <h1>...loading</h1>
        ) : (
          <TransitionGroup>
            {posts &&
              posts.map((post) => (
                <GridColumn key={post?.id}>
                  <PostCard post={post} />
                </GridColumn>
              ))}
          </TransitionGroup>
        )}
      </GridRow>
    </Grid>
  );
};

export default Home;
