import PageFrame from '@/components/PageFrame'
import { CircularProgress } from '@mui/material'

const ExplorerLoadingPage = () => {
  return (
    <PageFrame className='grid place-items-center'>
      <CircularProgress color="info" size={100} />
    </PageFrame>
  )
}

export default ExplorerLoadingPage