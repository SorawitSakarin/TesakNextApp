import Image from 'next/image';

export default function Home() {
  return (
    <main
      className='flex min-h-screen flex-col items-center justify-between p-24'
      data-theme='tesak'
    >
      <div className='h-[100px] w-[100px] bg-primary'>
        <div className='h-[50px] w-[50px] bg-secondary'>
          <div className='h-[10x] w-[10px] bg-accent'>hi</div>
        </div>
      </div>
      <h1 className='text-5xl font-bold'>Heading 1</h1>
      <h1 className='text-5xl'>Heading 1</h1>
      <h2 className='text-4xl font-bold'>Heading 2</h2>
      <h3 className='text-3xl font-bold'>Heading 3</h3>
      <h4 className='text-2xl font-bold'>Heading 4</h4>
      <h5 className='text-xl font-bold'>Heading 5</h5>
      <h6 className='text-lg font-bold'>Heading 6</h6>
      <p className='text-5xl '>Heading 1</p>
      <p className='text-4xl '>Heading 2</p>
      <p className='text-3xl '>Heading 3</p>
      <p className='text-2xl '>Heading 4</p>
      <p className='text-xl '>Heading 5</p>
      <p className='text-lg '>Heading 6</p>
      <div className='bg-primary border-1 border-primary flex flex-col gap-4 transform translate-x-10 translate-y-10 translate-z-10'>
        <p className='text-5xl'>Test</p>
        <p className='text-3xl'>Sorawit sakarin</p>
        <p className='text-2xl'>Sorawit sakarin</p>
        <p className='text-xl'>Sorawit sakarin</p>
      </div>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='wave-card'>3D Transformed Box</div>
      </div>
    </main>
  );
}
