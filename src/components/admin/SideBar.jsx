import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='text-light d-flex flex-column p-3' 
    style={{width:'250px',
        background:'linear-gradient(135deg, rgb(12,79,46) ,rgb(54,66,159))'
    }}>
        <h4 className='text-center mb-4'>
            <i className='bi bi-speedometer2 me-3'></i>Admin Panel
        </h4>
        <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item mb-3'>
                <NavLink 
                    to='/admin-dashboard' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-grid me-2'></i>Dashboard
                </NavLink>
            </li> 

            <li className='nav-item mb-3'>
                <NavLink 
                    to='/admin-dashboard/students' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-lines-fill me-2'></i>Students
                </NavLink>
            </li> 

            <li className='nav-item mb-3'>
                <NavLink 
                    to='/admin-dashboard/parents' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-people-fill me-2'></i>Parents
                </NavLink>
            </li> 

            <li className='nav-item mb-3'>
                <NavLink 
                    to='/admin-dashboard/teachers' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-badge me-2'></i>Teachers
                </NavLink>
            </li> 

            <li className='nav-item mb-3'>
                <NavLink 
                    to='/admin-dashboard/classes' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-journal-bookmark me-2'></i>Classes
                </NavLink>
            </li> 
        </ul>


    </div>
  )
}

export default SideBar