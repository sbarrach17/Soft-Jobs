import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = async () => {
    try {
      const token = window.sessionStorage.getItem('token')
      const { data } = await axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      if (data && data.length > 0) {
        setDeveloper({ ...data[0] })
      } else {
        throw new Error('No user data found')
      }
    } catch (error) {
      console.error(error)
      window.sessionStorage.removeItem('token')
      setDeveloper(null)
      navigate('/')
    }
  }

  useEffect(() => {
    getDeveloperData()
  }, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  )
}

export default Profile
