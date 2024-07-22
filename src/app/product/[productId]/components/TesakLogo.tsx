interface TesakLogoProps {
  color?: string;
  width?: string;
}
export default function TesakLogo({
  color = '#000000',
  width = '100%',
}: TesakLogoProps) {
  const widthExtra = (Math.sqrt(2) * 100) / 3;
  return (
    <div style={{ width }}>
      <div
        id='Tesak Logo'
        className='flex w-full aspect-square flex-wrap relative'
      >
        <div className='w-1/3 aspect-square'></div>
        <div className='w-1/3 aspect-square'></div>
        <div
          className='w-1/3 aspect-square rounded-full'
          style={{ backgroundColor: color }}
        ></div>
        <div className='w-1/3 aspect-square'></div>
        <div
          className='w-1/3 aspect-square'
          style={{ backgroundColor: color }}
        ></div>
        <div className='w-1/3 aspect-square'></div>
        <div
          className='w-1/3 aspect-square'
          style={{ backgroundColor: color }}
        ></div>
        <div className='w-1/3 aspect-square'></div>
        <div
          className='w-1/3 aspect-square'
          style={{ backgroundColor: color }}
        ></div>
        <div
          className='absolute aspect-half -rotate-45 top-[50%] left-0 translate-x-[3%] translate-y-[-15%]'
          style={{ backgroundColor: color, width: `${widthExtra}%` }}
        ></div>
        {/* <div
        className={`absolute w-1/3 aspect-square   bottom-0 left-[50%] translate-x-[-50%] bg-${backgroundColor}`}
      ></div> */}
      </div>
    </div>
  );
}
