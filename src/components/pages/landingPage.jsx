import React from 'react'
import LandingNavbar from '../section/landingNavbar/landingNavbar'
import LandingBanner from '../section/landingBanner/landingBanner'

const LandingPage = () => {
  return (
    <div>
      <LandingNavbar/>
     <LandingBanner/>
      <div>Body</div>
      <div>footer</div>
    </div>
  )
}

export default LandingPage