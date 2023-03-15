import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Layout, Projects, Algolia } from '../components'

const ProjectsPage = ({ data }) => {
  const {
    allProjects: { nodes: projects },
  } = data

  return (
    <Wrapper>
      <Layout>
        <Projects title="our projects" projects={projects} page={true} />
        <Algolia />
      </Layout>
    </Wrapper>
  )
}

export const query = graphql`
  {
    allProjects: allAirtable(
      filter: { table: { eq: "projects" } }
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
  }
`

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--clr-grey-10);
  nav {
    background: var(--clr-primary-7);
  }
`

export default ProjectsPage
