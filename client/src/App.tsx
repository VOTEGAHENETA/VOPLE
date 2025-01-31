import Text from './components/atoms/Text';
import Image from './assets/sample/lg.png';
import './App.css';
import Poster from './components/atoms/Poster';
import Icon from './components/atoms/Icon';

function App() {


  return (
    <>
  
      <Text size='xl' weight='bold' color='#999999'>
        테스트
      </Text>
      <Poster size='m' src={Image}></Poster>
      <Icon name='mypage'></Icon>
      <Icon name='doodleback'></Icon>
    </>
  );
}

export default App;
