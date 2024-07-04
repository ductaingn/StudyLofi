import { useForm, SubmitHandler } from "react-hook-form"

interface TimeFormat {
  hour: string,
  minute: string,
  second: string
}

const SettingsPannel: React.FC<any> = (props)=>{
  const {register, handleSubmit, reset} = useForm<TimeFormat>(props.defaultTimer);

  const handleSetTimer:SubmitHandler<TimeFormat> = (formData:TimeFormat) =>{
    console.log('Set timer:', formData);
    props.setDefaultTimer({
      hour: formData.hour ? Number(formData.hour) : props.defaultTimer.hour,
      minute: formData.minute ? Number(formData.minute) : props.defaultTimer.minute,
      second: formData.second ? Number(formData.second) : props.defaultTimer.second
    })
    console.log(props.defaultTimer);
    
    reset();
  };

  const TimeSetter = ()=>{
    return (
      <>
        <div className="grid grid-cols-2 w-full">
          <div className="grid justify-center gap-y-4">
            <p className="text-center">Set your focus time</p>
            <div className="flex">
              <input 
                className='bg-transparent outline-transparent text-xl text-white font-[760] italic text-center w-16 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none'
                autoComplete="off"
                placeholder={props.defaultTimer.hour.toString().padStart(2,'0')}
                type="text" 
                maxLength={2}
                {...register('hour')}/>
              <p>:</p>
              <input 
                className='bg-transparent outline-transparent text-xl text-white font-[760] italic text-center w-16 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none'
                autoComplete="off"
                placeholder={props.defaultTimer.minute.toString().padStart(2,'0')}
                type="text"
                maxLength={2}
                {...register('minute')}/>
              <p>:</p>
              <input 
                className='bg-transparent outline-transparent text-xl text-white font-[760] italic text-center w-16 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none'
                autoComplete="off"
                placeholder={props.defaultTimer.second.toString().padStart(2,'0')}
                type="text"
                maxLength={2}
                {...register('second')}/>
            </div>
          </div>

          <div className="grid justify-center gap-y-4">

          </div>
        </div>
      </>
    )
  }

  return (props.trigger) ? (
    <>
      <div className="fixed z-10 top-1/2 left-1/2  w-8/12 h-10/12 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-950 bg-opacity-80 backdrop-blur-md rounded-md pb-4">
        <div className="w-full justify-center gap-y-4"> 
          <div className="flex w-full justify-center mb-8"> {/* Heading */}
            <h1 className='font-sans font-extrabold text-2xl text-slate-50 pt-2.5 tracking-wide'>Settings</h1>
            <button
              className="absolute top-4 right-4 z-20 text-red-800"
              onClick={()=>{props.setTrigger(false)}}
            >Close</button>
          </div>

          <div className="pb-8">
            <form onSubmit={handleSubmit(handleSetTimer)}>
              <TimeSetter />
              <div className="flex w-full justify-center">
                <button 
                  className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-20'
                  type="submit"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>


      </div>
    </>
  ):null;
}

export default SettingsPannel;