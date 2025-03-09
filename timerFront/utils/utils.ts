
export const getDateNdaysAgo = (n: number ) => {
    const date = new Date()
    date.setDate(date.getDate()-n)

    const dateString = date.toISOString().split("T")[0]
    return dateString

}   