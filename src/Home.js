import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  const routeToOrder = () => {
    history.push('/Form');
  }

  return (
    <div className='home-wrapper'>
      <img
        className='home-image'
        src='https://source.unsplash.com/F6-U5fGAOik'
        alt=''
      />
      <button
        onClick={routeToOrder}
        className='pizza-button'
      >
        Order Now!
      </button>
    </div>
  )
}