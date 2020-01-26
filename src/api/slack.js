import axios from 'axios';
import { slackToken } from '../config.json'

const slackUrl = 'https://slack.com/api/'

const get = async (endpoint) => {
    let result = await axios.get(slackUrl + endpoint, {
        headers: {
            Authorization: `Bearer ${slackToken}`
        }
    })
    let { data } = result.data
    return data
}

export default {

    getUserById(id) {
        return get(`users.info?user=${id}`)
    }

}