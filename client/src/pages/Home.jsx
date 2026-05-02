import React from 'react'
import Banner from '../Components/Home/Banner'
import Hero from '../Components/Home/Hero'
import Features from '../Components/Features'
import Testimonial from '../Components/Home/Testimonial'
import Footer from '../Components/Home/Footer'
import CallToAction from '../Components/Home/CallToAction'

const Home = () => {
    return (
        <div>
            <Banner />
            <Hero />
            <Features />
            <Testimonial />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home

