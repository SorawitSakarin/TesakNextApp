import React from 'react'
import LineManagerMessage from './LineManagerMessage'

interface LineManagerProps {
    lines: Record<"topic" | "message" | "description", string>[];
}
const LineManager: React.FC<LineManagerProps> = ({ lines }) => {

    return (
        <div id="line" className='flex flex-col gap-4'>
            <h1 className='text-3xl'>Line Manager (จัดการข้อความตอบกลับ)</h1>
            <table className="table  bg-base-300 text-info-content">
                <thead className='text-lg text-info-content'>
                    <tr>
                        <th>หัวข้อ</th>
                        <th>ข้อความ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {lines && lines?.length > 0 && lines.map((line: Record<"topic" | "message" | "description", string>, index: number) => {
                        return (
                            <LineManagerMessage key={index} line={line} index={index} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LineManager
