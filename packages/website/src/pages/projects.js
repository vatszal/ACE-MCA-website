import * as React from 'react'
import Seo from '../components/SEO'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ProjectPage from '../components/projects'

const Projects = ({ data }) => {
  const nav = data?.prismicLayout?.data?.body
  const rawProjectList = data?.allPrismicProjects?.nodes

  // Sort projects with specific priority: Both > Image Only > Link Only > Neither
  const sortedProjectList = React.useMemo(() => {
    if (!rawProjectList) return []
    
    return [...rawProjectList].sort((a, b) => {
      const aHasImage = a.data?.image?.gatsbyImageData
      const aHasLink = a.data?.source_link?.url
      const bHasImage = b.data?.image?.gatsbyImageData  
      const bHasLink = b.data?.source_link?.url
      
      // Priority levels based on your requirements
      const getPriority = (hasImage, hasLink) => {
        if (hasImage && hasLink) return 4  // Both - highest priority ⭐⭐⭐⭐
        if (hasImage && !hasLink) return 3 // Image only - second priority ⭐⭐⭐
        if (!hasImage && hasLink) return 2 // Link only - third priority ⭐⭐
        return 1 // Neither - lowest priority ⭐
      }
      
      const aPriority = getPriority(aHasImage, aHasLink)
      const bPriority = getPriority(bHasImage, bHasLink)
      
      return bPriority - aPriority
    })
  }, [rawProjectList])

  return (
    <Layout navbar={nav}>
      <Seo title="Project" />
      <ProjectPage projectList={sortedProjectList} />
    </Layout>
  )
}

export default Projects

export const ProjectQuery = graphql`
  query projectPage {
    prismicLayout {
      ...navbarInfo
    }
    allPrismicProjects {
      nodes {
        ...ProjectPage
      }
    }
  }
`
