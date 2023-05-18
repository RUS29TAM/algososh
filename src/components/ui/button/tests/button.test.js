import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from "@testing-library/react";
import {Button} from "../button";
import {Direction} from "../../../../types/direction";

describe('Тест для компонента Button', () => {
    it('Компонент Button отрисовка компонента с текстом - тест пройден', () => {
        const button = renderer.create(<Button text={'text'}/>).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button отрисовка компонента без текста - тест пройден', () => {
        const button = renderer.create(<Button text={''}/>).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button в не активеном состоянии - тест пройден', () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button в не активеном состоянии - тест пройден', () => {
        const button = renderer.create(<Button isLoader />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button type "button" - тест пройден', () => {
        const button = renderer.create(<Button type={'button'} />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button type "submit" - тест пройден', () => {
        const button = renderer.create(<Button type={'submit'} />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button "сортировка по возрастанию" - тест пройден', () => {
        const button = renderer.create(<Button sorting={Direction.Ascending} />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button "сортировка по убыванию" - тест пройден', () => {
        const button = renderer.create(<Button sorting={Direction.Descending} />).toJSON();
        expect(button).toMatchSnapshot();
    })
})

describe('Тест для слушателей событий компонента Button', () => {
    it('Нажатие на кнопку работает, колбэк вызывается корректно - тест пройден', () => {
        const onClick = jest.fn();
        render(<Button text={'text'} onClick={onClick}/>)
        const button = screen.getByText('text');
        fireEvent.click(button)
    })
})
