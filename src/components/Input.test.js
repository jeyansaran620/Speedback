import Input from "./Input";
import { render, screen, fireEvent } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import TextField from '@mui/material/TextField';

configure({ adapter: new Adapter() })
const dummyFunction = jest.fn()

const setupAndReturnInputElement = () => {
    return shallow(<Input name='Input 1' onTeamChange={() => dummyFunction()}/>)
 
}

test('shouldRenderInputElementWithTitle', () => {
    const inputElement = setupAndReturnInputElement()

    expect(inputElement.find(TextField)).toBeTruthy()
});
