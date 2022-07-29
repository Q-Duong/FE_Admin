import moment from 'moment'

function countRangeTime(createdAt) {
    const now = moment(new Date())
    const end = moment(createdAt)
    const durationHours = now.diff(end, "hours")
    return durationHours < 1 ? `${now.diff(end, "minutes")} phút trước` : `${durationHours} giờ trước`
}

export default countRangeTime