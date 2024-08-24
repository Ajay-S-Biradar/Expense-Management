import React, { useState } from 'react';
import { menuItems } from '../utils/sidebaritems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import { threebars } from '../utils/icons';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const Sidebar = () => {
  const [profileImg, setProfileImg] = useState(
    'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg'
  );
  const [username, setUsername] = useState('ajay s biradar');
  const [hideSidebar, setHideSidebar] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const location = useLocation().pathname;

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res =await axios.post(API_URL+'user/signout',{
        withCredentials: true, // Include cookies in the request
    });
    console.log(res);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return hideSidebar?
  <div>
    
  </div>
  :  (
    <div className={`relative h-full flex flex-col shadow-2xl shadow-red-300 w-1/4`}>
      {/* avatar */}
      <div className='m-5 h-full border-red-500 border rounded-3xl flex flex-col justify-between'>
        <div>
          <div
            className={`cursor-pointer absolute m-2 p-2`}
            onClick={() => setHideSidebar(true)}
          >
            {threebars}
          </div>
            <div className='rounded-full flex justify-center items-center mt-8'>
              <img className='h-32 w-32 object-cover rounded-full' src={profileImg} alt='' />
              <div>
                <h1 className='text-3xl'>{username}</h1>
              </div>
            </div>
          <div>
            <ul className='text-lg'>
              {menuItems.map(
                (item) =>
                  item && (
                    <Link to={item.link} key={item.id}>
                    <li
                      className={`${
                        location === item.link
                          ? 'border-blue-800 border-l-4 '
                          : 'hover:bg-rose-200 rounded-2xl '
                      } flex p-2 m-2 gap-3 items-center`}
                    >
                      {item.title}
                      <span>{item.icon}</span>
                    </li>
                    </Link>
                  )
              )}
            </ul>
          </div>
        </div>

          <div className='m-2 p-2'>
            <div>
              <h1 className='py-3 px-2 cursor-pointer hover:bg-rose-200 rounded-2xl'>
                Profile
              </h1>
            </div>
            <div>
              <h1
                className='py-3 px-2 cursor-pointer hover:bg-rose-200 rounded-2xl'
                onClick={()=> setConfirmModal(true)}
              >
                Sign out
              </h1>
            </div>
          </div>
      </div>

      {confirmModal && (
        <ConfirmModal setConfirmModal={setConfirmModal} handleSignOut={handleSignOut} />
      )}
    </div>
  );
};

export default Sidebar;
