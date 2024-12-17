import { useQuery, gql } from "@apollo/client";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const GET_POSTS_DATA = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      comments {
        id
        createdAt
        body
      }
    }
  }
`;
const Home = () => {
  const {
    loading,
    error,
    data: { getPosts: posts } = {} ,
  } = useQuery(GET_POSTS_DATA);
  return (
    <Grid columns="three" divided>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>

      <GridRow>
        {loading ? (
          <h1>...loading</h1>
        ) : (
          posts && posts.map(post => (
            <GridColumn key={post?.id}>
              <PostCard post={post} />
            </GridColumn>
          ))
        )}
      </GridRow>
    </Grid>
  );
};

export default Home;