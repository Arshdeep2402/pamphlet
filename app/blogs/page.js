'use client'
import BlogFooter from '@/Components/BlogFooter'
import BlogHeader from '@/Components/BlogHeader'
import BlogList from '@/Components/BlogList'

const page = () => {
  return (
    <>
        <BlogHeader />
        <BlogList />
        <BlogFooter /> 
    </>
  )
}

export default page