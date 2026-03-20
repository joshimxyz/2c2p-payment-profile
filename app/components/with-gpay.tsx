const WithGPay = () => {
  return (
    <button className='w-full bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors'>
      <span>Pay with</span>
      <img
        alt='gpay'
        src='/images/gpay.svg'
        className='h-6 object-contain'
      />
    </button>
  );
};

export default WithGPay;