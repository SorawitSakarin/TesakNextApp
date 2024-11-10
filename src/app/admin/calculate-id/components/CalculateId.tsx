'use client'
import React, { useState } from 'react'

const CalculateId = () => {

    const [yearHover, setYearHover] = useState(false)
    const [provinceHover, setProvinceHover] = useState(false)
    const [provinceShow, setProvinceShow] = useState(false)
    const [userTypeHover, setUserTypeHover] = useState(false)
    const [userTypeShow, setUserTypeShow] = useState(false)
    const [userTierHover, setUserTierHover] = useState(false)
    const [userTierShow, setUserTierShow] = useState(false)
    const [countHover, setCountHover] = useState(false)
    return (
        <div id="calculate" className='flex flex-col gap-4 w-full'>
            <h1 className='text-3xl'>Calculate User Id</h1>
            <div className='w-full flex flex-col items-center gap-2'>
                <p className='text-[32px] leading-[24px] font-bold'>
                    <span className="tooltip pt-2 font-bold " onMouseEnter={() => setYearHover(true)} onMouseLeave={() => setYearHover(false)} data-tip="ปี ค.ศ. 2024">24</span> - {" "}
                    <span className="tooltip pt-2 font-bold" onMouseEnter={() => setProvinceHover(true)} onMouseLeave={() => setProvinceHover(false)} data-tip="จังหวัดลพบุรี">07</span> - {" "}
                    <span className="tooltip pt-2 font-bold" onMouseEnter={() => setUserTypeHover(true)} onMouseLeave={() => setUserTypeHover(false)} data-tip="ประเภทผู้ใช้งาน: Farmer">1</span> - {" "}
                    <span className="tooltip pt-2 font-bold" onMouseEnter={() => setUserTierHover(true)} onMouseLeave={() => setUserTierHover(false)} data-tip="ระดับผู้ใช้งาน: Farmer one year">01</span> - {" "}
                    <span className="tooltip pt-2 font-bold group-hover:text-white" onMouseEnter={() => setCountHover(true)} onMouseLeave={() => setCountHover(false)} data-tip="ผู้สมัครคนที่: 123">000123</span>
                </p>
                <div className='flex flex-col w-full bg-base-300 p-2 rounded-[16px] mt-[18px]'>
                    <div className={`p-2 rounded-[8px] text-left w-full ${yearHover ? "bg-primary text-white" : ""}`}>
                        <p><span className='font-bold'>ปีที่สมัคร:</span> ใช้เลขสองหลักสุดท้ายของปีค.ศ.ที่สมัคร เช่น 2024 = 24</p>
                    </div>
                    <div className={`p-2 rounded-[8px] flex flex-col text-left w-full ${provinceHover ? "bg-primary text-white" : ""}`}>
                        <p><span className='font-bold'>จังหวัดที่อยู่ลงทะเบียน:</span> ใช้เลขสองหลักจากการแปลงจังหวัดเป็นตัวเลขตามตารางข้างล่าง <span className='btn rounded-full' onClick={() => setProvinceShow(!provinceShow)}>{provinceShow ? "ปิดตาราง" : "เปิดตาราง"}</span> </p>
                        {provinceShow && <table className="table  w-1/3 ">
                            <thead>
                                <tr>
                                    <th className={`${provinceHover ? "text-white" : ""}`}>Provinces</th>
                                    <th className={`${provinceHover ? "text-white" : ""}`}>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {provinces.map((province: any, index: number) => {
                                    return (
                                        <tr className='hover:bg-secondary hover:text-base-100' key={index}>
                                            <td>{province.name}</td>
                                            <td>{province.code}</td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>}
                    </div>
                    <div className={`p-2 rounded-[8px]  flex flex-col text-left w-full ${userTypeHover ? "bg-primary text-white" : ""}`}>
                        <p><span className='font-bold'>ประเภทผู้ใช้งาน(User type):</span> ใช้เลขหนึ่งหลักจากการแปลงประเภทเป็นตัวเลขตามตารางข้างล่าง <span className='btn rounded-full' onClick={() => setUserTypeShow(!userTypeShow)}>{userTypeShow ? "ปิดตาราง" : "เปิดตาราง"}</span> </p>
                        {userTypeShow && <table className="table  w-1/3 ">
                            <thead>
                                <tr>
                                    <th className={`${userTypeHover ? "text-white" : ""}`}>User type</th>
                                    <th className={`${userTypeHover ? "text-white" : ""}`}>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTypes.map((user: any, index: number) => {
                                    return (
                                        <tr className='hover:bg-secondary hover:text-base-100' key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.code}</td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>}
                    </div>
                    <div className={`p-2 rounded-[8px]  flex flex-col  text-left w-full ${userTierHover ? "bg-primary text-white" : ""}`}>
                        <p><span className='font-bold'>ระดับผู้ใช้งาน(User tier):</span> ใช้เลขสองหลักจากการแปลงระดับผู้ใช้งานเป็นตัวเลขตามตารางข้างล่าง <span className='btn rounded-full' onClick={() => setUserTierShow(!userTierShow)}>{userTierShow ? "ปิดตาราง" : "เปิดตาราง"}</span> </p>
                        {userTierShow && <table className="table  w-1/3 ">
                            <thead>
                                <tr>
                                    <th className={`${userTierHover ? "text-white" : ""}`}>User tier</th>
                                    <th className={`${userTierHover ? "text-white" : ""}`}>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTiers.map((user: any, index: number) => {
                                    return (
                                        <tr className='hover:bg-secondary hover:text-base-100' key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.code}</td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>}
                    </div>
                    <div className={`p-2 rounded-[8px] text-left w-full ${countHover ? "bg-primary text-white" : ""}`}>
                        <p><span className='font-bold'>เลขเรียงลำดับ: </span> ใช้เลขหกหลักเรียงจาก 0 ถึง 999999 โดยไล่ตามผู้ใช้งานที่ถูกสมัคร</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CalculateId


const userTypes = [
    { name: "farmer", code: "1" },
    { name: "coordinator", code: "2" },
    { name: "farmdinator", code: "3" },
    { name: "admin", code: "4" },
    { name: "employee", code: "5" },
];

const userTiers = [
    { name: "preVerified", code: "01", durationYear: null },
    { name: "farmerOneYear", code: "01", durationYear: 1 },
    { name: "farmerThreeYear", code: "02", durationYear: 3 },
    { name: "farmerTenYear", code: "03", durationYear: 10 },
    { name: "farmerHundredYear", code: "04", durationYear: 99 },
];

const provinces = [
    { "name": "กรุงเทพมหานคร", "code": "01" },
    { "name": "สมุทรปราการ", "code": "02" },
    { "name": "นนทบุรี", "code": "03" },
    { "name": "ปทุมธานี", "code": "04" },
    { "name": "พระนครศรีอยุธยา", "code": "05" },
    { "name": "อ่างทอง", "code": "06" },
    { "name": "ลพบุรี", "code": "07" },
    { "name": "สิงห์บุรี", "code": "08" },
    { "name": "ชัยนาท", "code": "09" },
    { "name": "สระบุรี", "code": "10" },
    { "name": "ชลบุรี", "code": "11" },
    { "name": "ระยอง", "code": "12" },
    { "name": "จันทบุรี", "code": "13" },
    { "name": "ตราด", "code": "14" },
    { "name": "ฉะเชิงเทรา", "code": "15" },
    { "name": "ปราจีนบุรี", "code": "16" },
    { "name": "นครนายก", "code": "17" },
    { "name": "สระแก้ว", "code": "18" },
    { "name": "นครราชสีมา", "code": "19" },
    { "name": "บุรีรัมย์", "code": "20" },
    { "name": "สุรินทร์", "code": "21" },
    { "name": "ศรีสะเกษ", "code": "22" },
    { "name": "อุบลราชธานี", "code": "23" },
    { "name": "ยโสธร", "code": "24" },
    { "name": "ชัยภูมิ", "code": "25" },
    { "name": "อำนาจเจริญ", "code": "26" },
    { "name": "บึงกาฬ", "code": "27" },
    { "name": "หนองบัวลำภู", "code": "28" },
    { "name": "ขอนแก่น", "code": "29" },
    { "name": "อุดรธานี", "code": "30" },
    { "name": "เลย", "code": "31" },
    { "name": "หนองคาย", "code": "32" },
    { "name": "มหาสารคาม", "code": "33" },
    { "name": "ร้อยเอ็ด", "code": "34" },
    { "name": "กาฬสินธุ์", "code": "35" },
    { "name": "สกลนคร", "code": "36" },
    { "name": "นครพนม", "code": "37" },
    { "name": "มุกดาหาร", "code": "38" },
    { "name": "เชียงใหม่", "code": "39" },
    { "name": "ลำพูน", "code": "40" },
    { "name": "ลำปาง", "code": "41" },
    { "name": "อุตรดิตถ์", "code": "42" },
    { "name": "แพร่", "code": "43" },
    { "name": "น่าน", "code": "44" },
    { "name": "พะเยา", "code": "45" },
    { "name": "เชียงราย", "code": "46" },
    { "name": "แม่ฮ่องสอน", "code": "47" },
    { "name": "นครสวรรค์", "code": "48" },
    { "name": "อุทัยธานี", "code": "49" },
    { "name": "กำแพงเพชร", "code": "50" },
    { "name": "ตาก", "code": "51" },
    { "name": "สุโขทัย", "code": "52" },
    { "name": "พิษณุโลก", "code": "53" },
    { "name": "พิจิตร", "code": "54" },
    { "name": "เพชรบูรณ์", "code": "55" },
    { "name": "ราชบุรี", "code": "56" },
    { "name": "กาญจนบุรี", "code": "57" },
    { "name": "สุพรรณบุรี", "code": "58" },
    { "name": "นครปฐม", "code": "59" },
    { "name": "สมุทรสาคร", "code": "60" },
    { "name": "สมุทรสงคราม", "code": "61" },
    { "name": "เพชรบุรี", "code": "62" },
    { "name": "ประจวบคีรีขันธ์", "code": "63" },
    { "name": "นครศรีธรรมราช", "code": "64" },
    { "name": "กระบี่", "code": "65" },
    { "name": "พังงา", "code": "66" },
    { "name": "ภูเก็ต", "code": "67" },
    { "name": "สุราษฎร์ธานี", "code": "68" },
    { "name": "ระนอง", "code": "69" },
    { "name": "ชุมพร", "code": "70" },
    { "name": "สงขลา", "code": "71" },
    { "name": "สตูล", "code": "72" },
    { "name": "ตรัง", "code": "73" },
    { "name": "พัทลุง", "code": "74" },
    { "name": "ปัตตานี", "code": "75" },
    { "name": "ยะลา", "code": "76" },
    { "name": "นราธิวาส", "code": "77" }
]
