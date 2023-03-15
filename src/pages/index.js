import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Hero, About, Projects, Slider, Survey } from '../components'

const HomePage = ({ data }) => {
  const {
    projects: { nodes: projects },
    customers: { nodes: customers },
  } = data

  return (
    <Layout>
      <Hero />
      <About />
      <Projects projects={projects} title="latest projects" />
      <Survey />
      <Slider customers={customers} />
    </Layout>
  )
}

export const query = graphql`
  {
    projects: allAirtable(
      filter: { table: { eq: "projects" } }
      limit: 3
      sort: { fields: data___date, order: DESC }
    ) {
      nodes {
        id
        data {
          date
          name
          type
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: DOMINANT_COLOR
                )
              }
            }
          }
        }
      }
    }
    customers: allAirtable(filter: { table: { eq: "customers" } }) {
      nodes {
        id
        data {
          name
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: DOMINANT_COLOR
                  width: 150
                  height: 150
                )
              }
            }
          }
          quote
          title
        }
      }
    }
  }
`

export default HomePage
