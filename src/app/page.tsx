'use client';
import TestA from '@/components/TestA';
import TestB from '@/components/TestB';
import { useEffect, useState } from 'react';

export default function Home() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    setCount((prev) => prev + 1);
    setShow2((prev) => !prev);
  }, [show]);

  console.log('test');

  const handleClick = () => {
    setShow(!show);
    // setCount((prev) => prev + 1);
    // setShow2(!show2);
  };
  return (
    <main
      className='flex min-h-screen flex-col items-center justify-between p-24'
      data-theme='tesak'
    >
      <div>
        <h1 className='text-6xl font-bold'>TESAK KASET</h1>
        <button onClick={handleClick}>click</button>
        {show && <p className='text-2xl'>Farmer-led Food Revolution.</p>}
      </div>
      {show && <TestA />}
      <TestB show={show} />
    </main>
  );
}
