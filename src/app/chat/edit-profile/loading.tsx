import PageFrame from '@/components/PageFrame'
import { ConvoPuffLoader } from '@/components/spinners'

const EditProfileLoadingPage = () => {
  return (
    <PageFrame className='grid place-items-center'>
      <ConvoPuffLoader color="#36d7b7" size={100} />
    </PageFrame>
  )
}

export default EditProfileLoadingPage