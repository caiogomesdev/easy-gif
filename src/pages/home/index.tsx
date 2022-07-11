import React from 'react';
import { useSelector } from 'react-redux';
import { Container, MyGif } from './styles';

import Canva from '../../components/canva';
import AddImage from '../../components/add-images';
import { rootState } from '../../store';

const App: React.FC = () => {
  const images = useSelector((state: rootState ) => state.image);

  return (
    <Container imagesLenght={images.data.length}>
      <MyGif>My Gif</MyGif>
      <Canva />
      <AddImage />
    </Container>
  );
};

export default App;
