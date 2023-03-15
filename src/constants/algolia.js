const airtableQuery = `
  {
    projects: allAirtable(filter: {table: {eq: "projects"}}) {
      nodes {
        id
        data {
          date
          name
          type
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

function pageToAlgoliaRecord({ id, data: { name, type, date, image } }) {
  return {
    objectID: id,
    name,
    type,
    date,
    image: { ...image.localFiles[0].childImageSharp.gatsbyImageData },
  }
}

const queries = [
  {
    query: airtableQuery,
    transformer: ({ data }) => {
      const {
        projects: { nodes: projects },
      } = data

      return projects.map(pageToAlgoliaRecord)
    },
  },
]

module.exports = queries
