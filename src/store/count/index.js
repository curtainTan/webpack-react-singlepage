


const countData = {
    count: 1
}

export default ( state = countData, action ) => {
    switch( action.type ){
        case "add":
            state.count += 1
            return { ...state }
        default: return state
    }
}


