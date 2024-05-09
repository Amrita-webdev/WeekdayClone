import React, { useEffect, useRef, useState } from 'react'
import JobCard from './JobCard';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actions, sagaActions } from '../redux/reducer'
import Api from '../redux/Api';

const Body = () => {
    const dispatch = useDispatch()
    const {loading, hasMore, page} = useSelector((state) => state.jobs)
    const [jobs, setJobs] = useState([])

    const elementRef = useRef(null)

    const onIntersection = (entries) => {
        const firstEntry = entries[0]
        if(firstEntry.isIntersecting && hasMore){
            fetchMoreJobs()
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
        const response = await Api.getJobs({"limit":10, "offset": page*10})
        if(response.data.jdList.length === 0) {
            dispatch(actions.setHasMore(false))
        } else{
            console.log(response)
            setJobs(prevJobs => [...prevJobs, ...response.data.jdList])
            dispatch(actions.setPage(prevPage => prevPage+1))
        }
    }

  return (
    <>
    <Grid container spacing={4} style={{padding: '24px'}}>
        {jobs.map((job, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
                <JobCard job={job}/>
            </Grid>
        ))}
    </Grid>
        {
            hasMore && <div ref={elementRef}>Load more..</div>
        }
    </>
  )
}

export default Body