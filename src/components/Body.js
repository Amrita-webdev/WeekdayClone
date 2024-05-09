import React, { useEffect, useState } from 'react'
import JobCard from './JobCard';
import { Grid } from '@mui/material';

const Body = () => {
    useEffect(() => {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        const body = JSON.stringify({
            // "limit": 10,
            // "offset": 0
        })
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body
        }
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
    }, [])

  return (
    <Grid container spacing={4} style={{padding: '24px'}}>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard/>
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
            <JobCard />
        </Grid>
    </Grid>
  )
}

export default Body