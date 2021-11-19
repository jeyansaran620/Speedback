import { render, screen } from '@testing-library/react'
import Main from './Main'

test('renders learn react link', () => {

  render(<Main />)

  const linkElement1 = screen.getByText(/Team 1:/i)
  const linkElement2 = screen.getByText(/Team 2:/i)

  expect(linkElement1).toBeTruthy()
  expect(linkElement2).toBeTruthy()

})
