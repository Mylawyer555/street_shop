
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>

        <h1 className='text-6xl font-bold gap-24'>404 Not Found </h1>

        <Link to="/" >Return to Home</Link>

    </div>
  )
}

export default NotFoundPage