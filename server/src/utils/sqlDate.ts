function sqlDate(userDate?: Date| string){
    let now = new Date(userDate ? userDate: '')
    let d = now.toISOString()
    let date = d.slice(0, 10)
    let time = now.toTimeString().slice(0, 8)
    return date + " " + time
}

export default sqlDate