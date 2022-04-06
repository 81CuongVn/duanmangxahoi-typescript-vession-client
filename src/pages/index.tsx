import Navbar from "./../components/Navbar";
import { GetPostsDocument } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { useGetPostsQuery } from './../generated/graphql';

const Index = () => {
  const {data,loading} = useGetPostsQuery()

  return <div>
    <Navbar />
    {
      loading ? "LOADING...":(
        <>{data?.getPosts?.posts?.map(post => <div>{post.title}</div>)}</>
      )
    }
  </div>
}

export default Index;
export const getStaticProps = async () => { 
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GetPostsDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}