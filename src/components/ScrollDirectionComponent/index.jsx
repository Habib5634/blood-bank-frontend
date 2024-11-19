// ScrollDirectionComponent.js
import { setScrollDirection } from '@/Store/ReduxSlice/scrollDirectionSlice';
import { setScrollValue } from '@/Store/ReduxSlice/scrollValueSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ScrollDirectionComponent = () => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.scroll.direction);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollValue = window.pageYOffset || document.documentElement.scrollTop;

      // Dispatch the current scroll position to Redux
      dispatch(setScrollValue(currentScrollValue));

      // Optionally, log the scroll value to the console in real-time
      console.log('Current Scroll Value:', currentScrollValue);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        dispatch(setScrollDirection('down'));
      } else if (currentScrollTop < lastScrollTop) {
        dispatch(setScrollDirection('up'));
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, lastScrollTop]);

  useEffect(() => {
    if (scrollDirection) {
      console.log(`Scroll direction: ${scrollDirection}`);
    }
  }, [scrollDirection]);

  return null;
};

export default ScrollDirectionComponent;
