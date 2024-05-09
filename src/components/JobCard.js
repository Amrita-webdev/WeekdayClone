import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { withStyles, useStyles } from '@mui/material';

const JobCard = () => {
  const [openModal, setOpenModal] = useState(false)
  const [isTruncated, setIsTruncated] = useState(true)
  const handleClick = () => {
      setOpenModal(true)
  }

  const text = "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment."
  const toggleTruncated = () => {
    if(text.length > 500)setIsTruncated(!isTruncated)
  }
  console.log(text.length)
  const maxLength = 550
  const fadeLength = text.length - maxLength
  return (
    <Card style={{borderRadius: '20px', maxHeight: '100%', height: '500px', maxWidth: '360px', position: 'relative'}}>
      <CardContent>
        <div style={{display: 'flex', gap: '0.5rem'}}>
            <img src="https://logo.clearbit.com/dropbox.com" alt="logo" style={{width: '25px', height: '25px', borderRadius: '50%'}}/>
          <div>
            <div>
              <h3 style={{fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px', color: '#8b8b8b'}}>Builder.ai</h3>
              <h2 style={{fontSize: '14px', lineHeight: 1.5}}>UI Developer</h2>
            </div>
            <p style={{fontSize: '11px', fontWeight: 500, marginTop: '5px', marginBottom: 0}}>Gurugram</p>
          </div>
        </div>
        <div>
          <p style={{margin: '8px 0', fontSize: '14px', fontWeight: 400, color: '#4D596A', lineHeight: 1.43}}>
            Estimated Salary:
            $12 - $14 LPA
            <span><img style={{height: '14px', marginLeft: '0.45rem'}} aria-label="Estimated by Weekday. Not provided by employer" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/26a0_fe0f/32.png" alt='warning'/></span>
          </p>
        </div>
        <div style={{position: 'relative'}}>
          <div style={{boxSizing: 'inherit'}}>
            <p style={{margin: 0, fontSize: '1rem', lineHeight: 1.5, fontWeight: 500, color: '#000000de'}}>About Role:</p>
            { isTruncated ? (<div style={{whiteSpace: 'pre-wrap', fontSize: '14px', opacity: isTruncated ? 0.5 : 1}}>{text.slice(0, maxLength).split('').map((char, index) => (
              <span key={index} style={{opacity: index < fadeLength ? 1 : 0.5 - (index - fadeLength) / fadeLength / 2}}>{char}</span>))}</div>) : <div>{text}{text.length > maxLength+fadeLength && (
                <span style={{opacity: 0.5}}>{text.slice(maxLength, maxLength+fadeLength)}</span>
              )}</div>}
          </div>
          <div style={{textAlign: 'center', marginBottom: '0.5rem'}}>
            <button style={{color: '#4943da', fontSize: '14px', fontWeight: 400, textDecoration: 'none', cursor: 'pointer', position: 'absolute', top: '10', zIndex: 1, bottom: '10', right: '0', height: '20px', left: '0', padding: 0, border: 'none', background: 'none'}} onClick={() => handleClick}>Show More</button>
          </div>
        </div>
        <div style={{marginTop: '30px'}}>
          <h3 style={{fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px', color: '#8b8b8b'}}>Minimum Experience</h3>
          <h2 style={{fontSize: '14px', lineHeight: 1.5, fontWeight: 400, color: '#000000de'}}>2 years</h2>
      </div>
      </CardContent>
      <div style={{display: 'grid', padding: '8px 16px', gap: '0.5rem', position: 'absolute', bottom: 0, left: 0, right: 0, maxWidth: '100%'}}>
        <button style={{backgroundColor: '#55EFC4', color: '#000', width: '100%', fontWeight: 500, border: 'none', borderRadius: '8px', height: '30px', fontSize: '14px'}}>Easy Apply</button>
        <button style={{backgroundColor: '#4943DA', color: '#fff', width: '100%', fontWeight: 500, border: 'none', borderRadius: '8px', height: '30px', fontSize: '14px'}}><div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center'}}><img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="profile_photo" style={{width: '20px', height: '20px', border: '1px solid white', borderRadius: '50%'}}/> Ask for referral </div></button>
      </div>
    </Card>
  )
}

export default JobCard