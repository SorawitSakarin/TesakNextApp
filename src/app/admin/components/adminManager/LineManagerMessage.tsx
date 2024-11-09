import React, { useEffect, useState } from 'react'

interface LineManagerMessageProps {
    line: Record<"topic" | "message" | "description", string>
    index: number
}
const LineManagerMessage: React.FC<LineManagerMessageProps> = ({ line, index }) => {
    const [updateStatus, setUpdateStatus] = useState(false)
    const [lineMessage, setLineMessage] = useState(line.message);
    const [isLoading, setIsLoading] = useState(false);
    const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);
    const changeHandler = (e: any) => {
        e.preventDefault()
        setLineMessage(e.target.value)
    }

    const updateHandler = async () => {
        // send API to db
        setIsLoading(true);
        const body = { ...line, message: lineMessage };
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/messages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${lineAccessToken}`
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setUpdateStatus(false);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert(error);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        const token = localStorage.getItem('userLineToken');
        setLineAccessToken(token ? JSON.parse(token) : null);
    }, []);

    const cancelHandler = () => {
        setLineMessage(line.message)
        setUpdateStatus(false)
    }
    return (
        <tr key={index}>
            <td className='text-base'>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold uppercase'>{line.topic}:</p>
                    <p className='font-thin'>{line.description}</p>
                </div>
            </td>
            <td className={`${isLoading ? "skeleton" : ""}`}>
                <input type="text"
                    placeholder="Type here"
                    className="input w-full max-w-xs"
                    onChange={changeHandler}
                    value={lineMessage}
                    disabled={!updateStatus}
                />
            </td>
            <td>
                <div className=' flex justify-end'>
                    {!updateStatus && <button className='btn btn-primary' onClick={() => { setUpdateStatus(!updateStatus) }}>edit</button>}
                    {updateStatus && <button className='btn btn-error  mr-1' onClick={cancelHandler}>cancel</button>}
                    {updateStatus && <button className='btn btn-primary ' onClick={updateHandler}>update</button>}
                </div>
            </td>
        </tr>


    )
}

export default LineManagerMessage