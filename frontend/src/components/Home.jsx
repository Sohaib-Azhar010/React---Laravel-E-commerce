import React from 'react'

import LatestProducts from './common/LatestProducts'
import FeaturedProducts from './common/FeaturedProducts'
import Hero from './common/Hero'
import Layout from './common/Layout'
import ContactForm from './common/ContactForm'
import ExploreSection from './common/ExploreSection'

const Home = () => {
  return (
    <>
    <Layout>
    <Hero/>
    <LatestProducts/>
    <FeaturedProducts/>
    <ExploreSection/>
    <ContactForm/>
    </Layout>
    </>
  )
}

export default Home
