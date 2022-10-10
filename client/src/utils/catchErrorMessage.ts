function catchErrorMessage(ex: any) {
    let message = 'Internal Error'

    if (ex.response && ex.response.data) {
        if (ex.response.data.message) {
            message = ex.response.data.message
        } else {
            message = ex.response.data
        }
    } else {
        if (ex.message) {
            message = ex.message
        }
    }

    return message
}

export default catchErrorMessage
