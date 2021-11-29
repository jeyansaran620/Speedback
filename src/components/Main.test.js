import { render, screen } from '@testing-library/react'
import Main from './Main'
import Box from '@mui/material/Box';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


configure({ adapter: new Adapter() });
test('renders learn react link', () => {

  const component =  shallow(<Main />)

  expect(component.find(Box)).toBeTruthy()

})
