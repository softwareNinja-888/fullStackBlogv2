export function Line({direction = 'horizontal',width='w-full',classStyle=''}){

    return (
       <div className={direction === 'horizontal' ? `w-full h-px bg-black ${width} ${classStyle}` : `h-full w-px bg-black ${width} ${classStyle}`}></div>
    )
}