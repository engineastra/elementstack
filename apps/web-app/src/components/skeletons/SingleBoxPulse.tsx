import React from 'react';

const SingleBoxPulse = ({
  width = '100%',
  height = '100%',
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div className="rounded-md animate-pulse bg-pannel" style={{ width, height }}></div>
  );
};

export default SingleBoxPulse;
