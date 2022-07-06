import React from 'react';
import { Container, MyGif } from './styles';

import Canva from '../../components/canva';
import AddImage from '../../components/add-images';

const App: React.FC = () => {
  return (
    <Container>
      <MyGif>My Gif</MyGif>
      <Canva />
      <AddImage />
    </Container>
  );
};

export default App;
