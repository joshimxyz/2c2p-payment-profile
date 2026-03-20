import { CreditCard, Landmark, Smartphone } from 'lucide-react';

const selectPaymentType = () => {
  return (
    <div className='grid grid-cols-3 gap-3'>
      <button className='border-2 border-[#0088FF] bg-[#0088FF] rounded-xl p-2 flex flex-col items-center justify-center gap-1 text-white shadow-sm transition-colors'>
        <CreditCard strokeWidth={1}/>
        <span className='text-[12px] font-semibold'>Card</span>
      </button>
      <button className='border border-gray-200 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:border-[#0088FF] hover:text-[#0088FF] transition-colors'>
        <Smartphone strokeWidth={1}/>
        <span className='text-[12px] font-medium'>Mobile Banking</span>
      </button>
      <button className='border border-gray-200 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:border-[#0088FF] hover:text-[#0088FF] transition-colors'>
        <Landmark strokeWidth={1}/>
        <span className='text-[12px] font-medium'>Net Banking</span>
      </button>
    </div>
  );
};

export default selectPaymentType;
