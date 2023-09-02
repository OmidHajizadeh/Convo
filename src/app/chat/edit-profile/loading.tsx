import { ConvoPuffLoader } from '@/components/spinners'

const EditProfileLoadingPage = () => {
  return (
    <div className='grid place-items-center h-full p-4'>
      <ConvoPuffLoader color="#36d7b7" size={100} />
    </div>
  )
}

export default EditProfileLoadingPage