import React from 'react';
import './styles.css';

import Canva from '../../components/canva';
import AddImage from '../../components/add-images';

const App: React.FC = () => {
  return (
    <div className='container'>
      <h1 className='my-gif'>My Gif</h1>
      <Canva />
      <AddImage />
    </div>
  );
};

export default App;
