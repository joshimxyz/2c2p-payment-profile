const Footer = () => {
  return (
    <div className='p-4 flex justify-between items-center text-sm font-medium text-[#0088FF] border-t border-transparent bg-white mt-auto'>
      <div className='flex gap-3'>
        <button className='hover:underline'>Support</button>
        <button className='hover:underline'>FAQ</button>
      </div>
      <button className='flex items-center gap-1 hover:text-[#0056a3]'>
        <i className='fas fa-language'></i> English
        <i className='fas fa-chevron-down text-xs'></i>
      </button>
    </div>
  );
};

export default Footer;
