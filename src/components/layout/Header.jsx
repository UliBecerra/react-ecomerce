import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { changeIsShowCart } from '../../store/slices/cart.slices'

function Header() {
  const {token} = useSelector(store => store.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClickChangeShowCart = () =>{
    if (!token) return navigate('/login')
    dispatch(changeIsShowCart())
  }
  return (
   <section>
     <section className='fixed w-full h-[60px] hlg:h-[69px] bg-white hlg:border-b-[1px] z-20'>
    <section className=' flex justify-between items-center shadow-sm  border-gray-200  '>
      <Link className='p-4' to="/">
        <h1 className='text-2xl hlg:text-3xl font-extrabold text-red-500'>e-commerce</h1>
      </Link>

      <nav className='h-full w-[45%] grid grid-cols-3  text-2xl place-content-center text-gray-400  '>

        <Link to="/login" className=' h-[60px] hlg:h-[69px] hlg:border-[1px] border-gray-200 grid place-content-center ' ><i className='h-full bx bx-user'></i></Link>

        <Link to="/purchases" className='h-full grid place-content-center ' ><i className='bx bx-box'></i></Link>

        <button onClick={handleClickChangeShowCart} className='h-full hlg:border-[1px] border-gray-200 ' ><i className='bx bx-cart'></i></button>
      </nav>
    </section>
    </section>
    <div className='h-[69px]'></div>
   </section>
  )
}

export default Header