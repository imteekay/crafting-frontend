import { useEffect, useState } from 'react';

const Wrapper = ({ children }) => (
  <div style={{ border: '1px solid', width: '300px', height: '24px' }}>
    {children}
  </div>
);

const LoadingBar = ({ width }) => (
  <div style={{ width, height: '100%', backgroundColor: 'black' }}></div>
);

const ProgressBar = ({ loading }) => (
  <Wrapper>
    <LoadingBar width={loading} />
  </Wrapper>
);

const Page = () => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (loading < 100) {
        setLoading(loading + 1);
      }
    }, 20);
  }, [loading]);

  return (
    <div style={{ margin: '8px' }}>
      <p>Progress Bar: {loading}%</p>
      <ProgressBar loading={`${loading}%`} />
    </div>
  );
};

export default Page;
