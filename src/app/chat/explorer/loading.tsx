import { CircularProgress } from '@mui/material'

import PageFrame from '@/components/PageFrame'

const ExplorerLoadingPage = () => {
  return (
    <PageFrame className='grid place-items-center'>
      <CircularProgress color="info" size={100} />
    </PageFrame>
  )
}

export default ExplorerLoadingPage