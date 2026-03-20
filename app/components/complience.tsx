const Complience = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 mt-4'>
      <div className='flex items-center gap-2'>
        <span className='text-xs text-gray-500 font-medium'>Powered by</span>
        <img
          alt='2c2p'
          className='h-3 object-contain'
          src='/images/2c2p-logo.png'
        />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-xs text-gray-500 font-medium'>Secured by</span>
        <div className='flex gap-2'>
          <img
            alt='iso 27001'
            className='h-4 object-contain'
            src='/images/iso_27001_logo.svg'
          />

          <img
            alt='PCI DSS'
            className='h-4 object-contain'
            src='/images/pci_dss_logo.svg'
          />

          <img
            alt='pso'
            className='h-4 object-contain'
            src='/images/pso_logo.svg'
          />
        </div>
      </div>
    </div>
  );
};

export default Complience;
