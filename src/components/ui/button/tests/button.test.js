import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from "@testing-library/react";
import {Button} from "../button";

describe('Тест для компонента Button', () => {
    it('Компонент Button отрисовка текста компонента - тест пройден', () => {
        const button = renderer.create(<Button text={'text'}/>).toJSON();
        expect(button).toMatchSnapshot();
    })
})

describe('Тест для слушателей событий компонента Button', () => {
    it('Нажатие на кнопку работает - тест пройден', () => {
        const onClick = jest.fn();
        render(<Button text={'text'} onClick={onClick}/>)
        const button = screen.getByText('text');
        fireEvent.click(button)
    })
})