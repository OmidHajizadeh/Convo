import CircularProgress from '@mui/material/CircularProgress';

import PageFrame from '@/components/PageFrame'

const EditProfileLoadingPage = () => {
  return (
    <PageFrame className='grid place-items-center'>
      <CircularProgress color="info" size={100} />
    </PageFrame>
  )
}

export default EditProfileLoadingPage