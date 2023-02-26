const useReport = () => {
  const rejectJob = (id: number) => {
    console.log('rejectJob', id)
  }
  const rejectReport = (id: number) => {
    console.log('rejectReport', id)
  }
  return { rejectJob, rejectReport }
}

export default useReport
