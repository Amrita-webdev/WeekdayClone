import axios from 'axios'

const Api = {
    getJobs: (data) => {
        return axios.post(`https://api.weekday.technology/adhoc/getSampleJdJSON`, { ...data })
    }
}

export default Api