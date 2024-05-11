import React, { useEffect, useRef, useState } from 'react'
import JobCard from './JobCard';
import { Checkbox, Grid } from '@mui/material';
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
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem'
    },
    dropdown: {
        margin: '2px',
        padding: '2px',
        color: '#8b8b8b',
        boxSizing: 'border-box',
        height: '30px',
        width: 'auto',
        border: '1px solid #808080',
        borderRadius: '4px'
    },
    filterContainer: {
        display: 'flex',
        padding: '2rem 1rem',
        alignItems: 'left'
    },
    options: {
        height: '1.5rem !important',
        color: '#808080 !important'
    },
    searchBox: {
        padding: '4px',
        color: '#8b8b8b',
        boxSizing: 'border-box',
        height: '30px',
        width: 'auto',
        border: '1px solid #8b8b8b',
        borderRadius: '4px'
    },
    filterItems: {
        margin: '0.5rem',
        padding: '0.2rem'
    },
    remote: {
        color: '#8b8b8b',
        fontSize: '14px'
    },
    checkbox: {
        width: '14px',
        height: '14px'
    }
}
const Body = ({classes}) => {
    const dispatch = useDispatch()
    const {loading, page} = useSelector((state) => state.jobs)
    const [jobs, setJobs] = useState([])

    const [rolesOption, setRolesOption] = useState([])
    const [experienceOption, setExperienceOption] = useState([])
    const [locationOption, setLocationOption] = useState([])
    const [minSalaryOption, setMinSalaryOption] = useState([])

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedMinSalary, setSelectedMinSalary] = useState(0);
    const [showRemoteJobs, setShowRemoteJobs] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const elementRef = useRef(null)
    const fetchTimeOut = useRef(null)

    useEffect(() => {
        const rolesSet = new Set();
        const experienceSet = new Set();
        const locationSet = new Set();
        const minSalarySet = new Set();

        jobs.forEach((job) => {
            rolesSet.add(job?.jobRole);
            experienceSet.add(job?.minExp !== null ? job?.minExp : job?.maxExp);
            locationSet.add(job?.location);
            minSalarySet.add(job?.minJdSalary);
        });

        setRolesOption(Array.from(rolesSet));
        setExperienceOption(Array.from(experienceSet));
        setLocationOption(Array.from(locationSet));
        setMinSalaryOption(Array.from(minSalarySet));
    }, [jobs]);

    const filterJobs = () => {
        let filteredJobs = jobs;

        // Filter by selected roles
        if (selectedRoles.length > 0) {
            filteredJobs = filteredJobs.filter((job) => selectedRoles.includes(job?.jobRole));
        }

        // Filter by selected experience
        if (selectedExperience.length > 0) {
            filteredJobs = filteredJobs.filter((job) => selectedExperience.includes(job?.minExp) || selectedExperience.includes(job?.maxExp));
        }

        // Filter by selected location
        if (selectedLocation) {
            filteredJobs = filteredJobs.filter((job) => job.location === selectedLocation);
        }

        // Filter by selected salary range
        if (selectedMinSalary.length > 0) {
            filteredJobs = filteredJobs.filter((job) => selectedMinSalary.includes(job?.minJdSalary) || selectedMinSalary.includes(job?.maxJdSalary));
        }

        // Search by company name
        if (searchQuery.trim() !== '') {
            const query = searchQuery.trim().toLowerCase();
            filteredJobs = filteredJobs.filter((job) => job?.companyName.toLowerCase().includes(query));
        }

        // Filter remote jobs
        if (!showRemoteJobs) {
            filteredJobs = filteredJobs.filter((job) => job?.location !== 'remote');
        }

        return filteredJobs;
    };

    // Get filtered jobs
    const filteredJobs = filterJobs();


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
    <Grid container className={classes.container}>
        <Grid container item className={classes.filterContainer}>
            <Grid item className={classes.filterItems}>
                {/* Multiselect dropdown for job roles */}
                <select className={classes.dropdown} value={selectedRoles} onChange={(e) => setSelectedRoles(Array.from(e.target.selectedOptions, option => option.value))}>
                    <option disabled value="" hidden>Roles</option>
                    {rolesOption.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </Grid>
            <Grid item className={classes.filterItems}>
                {/* Single Select dropdown for experience */}
                <select className={classes.dropdown} value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)}>
                    {/* <option disabled hidden >Experience</option> */}
                    {experienceOption.map((exp) => (
                        <option className={classes.options} key={exp} value={exp}>{exp}</option>
                    ))}
                </select>
            </Grid>
            <Grid item className={classes.filterItems}>
                {/* Single select dropdown for location */}
                <select className={classes.dropdown} value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option disabled value="" hidden>Location</option>
                    {locationOption.map((loc) => (
                        <option className={classes.options} key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </Grid>
            <Grid item className={classes.filterItems}>
                {/* Single select dropdown for salary range */}
                <select className={classes.dropdown} value={selectedMinSalary} onChange={(e) => setSelectedMinSalary(e.target.value)}>
                    {/* <option disabled value="">Minimum Base Pay Salary</option> */}
                    {minSalaryOption.map((salary) => (
                        <option className={classes.options} key={salary} value={salary}>{salary}</option>
                    ))}
                </select>
            </Grid>
            <Grid item className={classes.filterItems}>
                <form>
                    <input type="text" placeholder="Search Company Name" className={classes.searchBox} value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                </form>
            </Grid>
            <Grid item className={classes.filterItems} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem'}}>
                <Checkbox label="Remote" onChange={(e) => setShowRemoteJobs(!showRemoteJobs)} className={classes.checkbox}/>
                <p className={classes.remote}>Show Remote Jobs</p>
            </Grid>
        </Grid>
        <Grid container item spacing={4} className={classes.bodyContent}>
            {filteredJobs.map((job, index) => (
                <Grid item xs={12} md={4} sm={6} key={index}>
                    <JobCard job={job}/>
                </Grid>
            ))}
        </Grid>
    </Grid>
        {
            loading && <div ref={elementRef} className={classes.loading}> <CircularProgress /> </div>
        }
    </>
  )
}

export default withStyles(style)(Body)