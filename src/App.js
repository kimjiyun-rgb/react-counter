import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import styles from './App.module.css';
function Counter()
{
  // let value = useRef(0);
  let value = 0;
  let h1Ref = useRef();

  const [hide, setHide] = useState(false);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('cyan');
  const [drwNo, setDrwNo] = useState('1102');

  const factorial = (n) =>
  {
    if (n == 0)
    {
      return 0;
    } else if (n == 1)
    {
      return 1;
    } else
    {
      return factorial(n - 1) * n
    }
  }

  const memo = useMemo(() =>
  {
    console.log("factorial 연산");
    let result = factorial(count);
    return result;
  }, [count]);

  // const no_memo = () =>
  // {
  //   console.log("factorial 연산");
  //   let result = factorial(count);
  //   return result;
  // };

  console.log(`Counter 컴포넌트가 생성되거나 state가 변경되어 랜더링 될 때마다 실행`);

  useEffect(() =>
  {
    async function getData()
    {
      const data = await fetch(`http://ggoreb.com/api/lotto.jsp?drwNo=${drwNo}`);
      const result = data.json().then((res) =>
      {
        console.log(res);
      });
    }
    getData();
  }, [drwNo]);

  const onClick = () =>
  {
    setCount((prev) =>
    {
      return prev + 1;
    });
    console.log(count);
  }
  return (
    <div style={{ backgroundColor: color }}>
      {
        !hide ? <h1>{count}</h1> : null
      }
      <h1 ref={h1Ref}>팩토리얼 : {memo}</h1>
      <button onClick={onClick}>Click</button>

      <button onClick={() =>
      {
        setColor('blue');
      }}>Click</button>

      <button onClick={() =>
      {
        setHide(prev => !prev);
      }}>Click</button>

      <button onClick={() =>
      {
        // const h2 = document.querySelector('h1:nth-chile(2)');
        // alert(h2.innerHTML);
        alert(h1Ref.current.innerHTML);
      }}>팩토리얼 값 확인</button>

      <button onClick={() =>
      {
        // value.current += 1;
        // console.log(value.current);
        value += 1;
        console.log(value);
      }}>value 증가</button>

      <select onChange={(e) =>
      {
        console.log(e);
        const selectedIndex = e.target.selectedIndex;
        const option = e.target[selectedIndex];
        setDrwNo(option.value);
      }}>
        <option value="1102">1102</option>
        <option value="1101">1101</option>
        <option value="1100">1100</option>
      </select>
    </div>
  )
}

function App()
{
  return (
    <div className={styles.App}>
      <Counter />
    </div>
  );
}

export default App;