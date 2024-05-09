import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { withStyles } from '@mui/styles';

const style={
  cardStyle: {
    borderRadius: '20px', maxHeight: '100%', height: '500px', maxWidth: '360px', position: 'relative'
  },
  contentDiv: {
    display: 'flex', gap: '0.5rem'
  },
  image: {
    width: '25px', height: '25px', borderRadius: '50%'
  },
  compayName: {
    fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px', color: '#8b8b8b'
  },
  jobRole: {
    fontSize: '14px', lineHeight: 1.5
  },
  location: {
    fontSize: '11px', fontWeight: 500, marginTop: '5px', marginBottom: 0
  },
  salary: {
    margin: '8px 0', fontSize: '14px', fontWeight: 400, color: '#4D596A', lineHeight: 1.43
  },
  warning: {
    height: '14px', marginLeft: '0.45rem'
  }

}

const JobCard = ({classes, job}) => {
  const [openModal, setOpenModal] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const handleClick = () => {
      setOpenModal(true)
  }
  const text = job.jobDetailsFromCompany

  useEffect(() => {
    if(text.length > 500) setIsTruncated(true)
  }, [isTruncated])

  const maxLength = 550
  const fadeLength = text.length - maxLength
  return (
    <Card className={classes.cardStyle}>
      <CardContent>
        <div className={classes.contentDiv}>
            <img src={job.logoUrl} alt="logo" className={classes.image}/>
          <div>
            <div>
              <h3 className={classes.companyName}>{job.companyName}</h3>
              <h2 className={classes.jobRole}>{job.jobRole}</h2>
            </div>
            <p className={classes.location}>{job.location}</p>
          </div>
        </div>
        <div>
          <p className={classes.salary}>
            Estimated Salary:
            {job.minJdSalary !== null && job.salaryCurrencyCode==='USD' ? '$' : ''}{job.minJdSalary !== null ? job.minJdSalary : ''} {job.minJdSalary !== null && '-'} {job.salaryCurrencyCode ? '$' : ''}{job.maxJdSalary} LPA
            <span><img className={classes.warning} aria-label="Estimated by Weekday. Not provided by employer" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/26a0_fe0f/32.png" alt='warning'/></span>
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
          <h2 style={{fontSize: '14px', lineHeight: 1.5, fontWeight: 400, color: '#000000de'}}>{job.minExp} years</h2>
      </div>
      </CardContent>
      <div style={{display: 'grid', padding: '8px 16px', gap: '0.5rem', position: 'absolute', bottom: 0, left: 0, right: 0, maxWidth: '100%'}}>
        <button style={{backgroundColor: '#55EFC4', color: '#000', width: '100%', fontWeight: 500, border: 'none', borderRadius: '8px', height: '30px', fontSize: '14px'}}>Easy Apply</button>
        <button style={{backgroundColor: '#4943DA', color: '#fff', width: '100%', fontWeight: 500, border: 'none', borderRadius: '8px', height: '30px', fontSize: '14px'}}><div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center'}}><img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="profile_photo" style={{width: '20px', height: '20px', border: '1px solid white', borderRadius: '50%'}}/> Ask for referral </div></button>
      </div>
    </Card>
  )
}

export default withStyles(style)(JobCard)