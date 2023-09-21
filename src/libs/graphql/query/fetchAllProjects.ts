import makeGraphqlRequest, { apiKey, client } from "../init";
//first:8
const FetchAllProjectsByCategoryQuery = `
  query getProjects($category: String, $endCursor: String) {
    projectSearch(first: 4, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

const FetchAllProjectsQuery = `
query getProjects($endCursor: String) {
  projectSearch(first: 4, after: $endCursor) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        title
        githubUrl
        description
        liveSiteUrl
        id
        image
        category
        createdBy {
          id
          email
          name
          avatarUrl
        }
      }
    }
  }
}
`;

const FetchAllProjects = async (category?: string | null, endCursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);

  if (category && typeof category === "string") {
    return makeGraphqlRequest(FetchAllProjectsByCategoryQuery, { category, endCursor })
  }

  try { return await makeGraphqlRequest(FetchAllProjectsQuery, { endCursor }) }
  catch (err) {
    console.error("fetch all ==> ", err);
    throw err
  }
};

export default FetchAllProjects;