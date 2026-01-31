'use client'
import React, { useEffect, useState } from 'react'
import { useGetAllFAQsQuery, useUploadFAQMutation } from '../../redux/feature/FAQs/FAQsAPI';
import Loader from './Loader';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const FAQs = () => {
  const [uploadFAQ, { isLoading }] = useUploadFAQMutation();
    const {
      data,
      isLoading: FAQLoading,
      refetch,
    } = useGetAllFAQsQuery({}, { refetchOnMountOrArgChange: true });
    const [openIndex, setOpenIndex] = useState(null);
  
    useEffect(() => {
      if (!isLoading) {
        refetch();
      }
    }, [isLoading, data]);
  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen  bg-gradient-to-tl from-violet-950 to-black '>
    <h1 className='w-full sm:text-[32px] text-[24px] font-bold mt-[100px] text-center text-white'>Frequently Asked Questions</h1>
        {FAQLoading ? (
        <Loader />
      ) : data?.FAQs?.length > 0 ? (
        <div className="space-y-4 w-full flex flex-col items-center">
          {data.FAQs.map((faq, index) => (
            <div
              key={index}
              className={`shadow-sm bg-transparent sm:w-[60%] w-[90%] min-h-[100px] flex flex-col justify-center 
                        ${
                          index !== data?.FAQs?.length - 1
                            ? "border-b-[3px] border-gray-400"
                            : "border-none"
                        }`}
            >
              <div className="w-full flex justify-between">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <MdOutlineKeyboardArrowDown
                  className="text-white size-[30px] cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              </div>
              {openIndex === index && (
                <div className="mt-2 mb-[20px]">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No FAQs uploaded yet.</p>
      )}
    </div>
  )
}

export default FAQs