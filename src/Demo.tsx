import Swiper from "./Swiper.tsx";
import styled from "styled-components";

const A = styled.div`
    width: 800px;
    overflow: hidden;
    margin: 20px auto 0;
    background: #000;
    padding: 20px;
`

const C = styled.div`
    width: 160px;
    height: 200px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
`

function randomColor() {
  const hex = Math.floor(Math.random() * 256 ** 3).toString(16);
  return hex.padStart(6, '0');
}

const D = new Array(100).fill(true).map(() => `https://fakeimg.pl/160x200/${randomColor()}`)

const Demo = () => {
  return (
    <A>
      <Swiper index='demo' viewCount={10}>
        {D.map((i) => (
          <div className='swiper-slide' key={i} onClick={() => alert(i)}>
            <C>
              <img src={i} alt={''}/>
            </C>
          </div>
        ))}
      </Swiper>
    </A>
  )
}

export default Demo
