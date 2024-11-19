// ScrollValueTracker.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ScrollValueTracker = () => {
  const dispatch = useDispatch();
 

  return (
    <div>
      <p>Scroll Value: {scrollValue}px</p>
    </div>
  );
};

export default ScrollValueTracker;
