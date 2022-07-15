import React, {useState, useRef, useLayoutEffect } from 'react';
import Point from './Point';
import Road from './Road';

function Graph({t, shortest, selected, changeSelected, changeShortest}) {
    const [width, height] = useWindowSize();
    const ref = useRef();

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            setSize([ref.current.offsetWidth, ref.current.offsetHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
      }

    return (
        <div style={styles.graph} ref={ref}>
            {t.points.map((pos) => <Point key={pos} pos={pos} dims={t.dims} selected={selected} changeSelected={changeSelected} shortest={shortest['points']} changeShortest={changeShortest} />)}
            {t.get_all_roads().map((x) => <Road key={x} road={x} dims={t.dims} size={{width:width,height:height}} path={shortest['roads']} />)}
        </div>
    )
}

const styles = {
  graph: {
    height: '100%',
    paddingRight:20,
    backgroundColor: 'aliceblue',
    position:"relative"
  }
}

export default Graph;