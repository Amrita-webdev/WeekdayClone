import React, { useEffect, useRef, useState } from 'react'
import JobCard from './JobCard';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actions, sagaActions } from '../redux/reducer'
import Api from '../redux/Api';
import { withStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';


const style= {
    bodyContent: {
        padding: '24px',
        scrollBehaviour: 'smooth'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0.5rem 0'
    }
}
const Body = ({classes}) => {
    const dispatch = useDispatch()
    const {loading, page} = useSelector((state) => state.jobs)
    const [jobs, setJobs] = useState([])

    const elementRef = useRef(null)
    const fetchTimeOut = useRef(null)

    const fetchThrottledMoreJobs = () => {
        if(!fetchTimeOut.current){
            fetchTimeOut.current = setTimeout(() => {
                fetchMoreJobs()
                fetchTimeOut.current = null
            }, 500)
        }
    }

    const onIntersection = (entries) => {
        const firstEntry = entries[0]
        if(firstEntry.isIntersecting && loading){
            fetchThrottledMoreJobs()
        }
    }
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection)
        if(observer !== null && elementRef.current){
            observer.observe(elementRef.current)
        }
        return () =>{
            if(observer !== null) {
                observer.disconnect()
            }
        }
    }, [jobs])

    async function fetchMoreJobs(){
        //fetch next jobs
        const response = await Api.getJobs({"limit":12, "offset": page*12})
        if(response?.data?.jdList?.length === 0) {
            dispatch(actions.setLoading(false))
        } else{
            setJobs(prevJobs => [...prevJobs, ...response?.data?.jdList])
            dispatch(actions.setPage(page+1))
        }
    }

  return (
    <>
    <Grid container spacing={4} className={classes.bodyContent}>
        {jobs.map((job, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
                <JobCard job={job}/>
            </Grid>
        ))}
    </Grid>
        {
            loading && <div ref={elementRef} className={classes.loading}> <CircularProgress /> </div>
        }
    </>
  )
}

export default withStyles(style)(Body)