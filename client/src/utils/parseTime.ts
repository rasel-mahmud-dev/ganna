function parseTime(count: number) {
    let h = 0
    let min = 0
    let second = 0
    let remain = 0

    if (count >= 3600) {
        h = count / 3600
        remain = count % 3600

        if (remain > 60) {
            // remain minutes
            min = remain / 60
            // remain second
            remain = remain % 60
            second = remain
        } else {
            second = remain
        }
    } else if (count >= 60) {
        // remain minutes
        min = count / 60
        // remain second
        remain = remain % 60
        second = remain
    } else {
        second = count
    }
    return {
        second: Math.round(second),
        min: Math.round(min),
        h,
    }
}

export default parseTime
