import { post } from '../helpers/FecthApi';
import { useAppContext } from '../helpers/ContextApi';

const Home = () => {
  const { setQuestionData, resetQuestionState } = useAppContext();

  const handleButtonClick = async (buttonText) => {
    try {
      resetQuestionState();
      const response = await post('anatomy/ai', { parameter: buttonText });
      console.log('Response:', response);
      setQuestionData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('Locomotor')}>Locomotor</button>
      <button onClick={() => handleButtonClick('Esplacno')}>Esplacno</button>
      <button onClick={() => handleButtonClick('Neuro')}>Neuro</button>
    </div>
  )
}

export default Home;