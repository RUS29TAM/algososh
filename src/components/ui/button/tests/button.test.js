import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from "@testing-library/react";
import {Button} from "../button";
import {Direction} from "../../../../types/direction";

describe('Тест для компонента Button', () => {
    it('Компонент Button отрисовка компонента с текстом', () => {
        const button = renderer.create(<Button text={'text'}/>).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button отрисовка компонента без текста', () => {
        const button = renderer.create(<Button text={''}/>).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button в не активеном состоянии', () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button в не активеном состоянии', () => {
        const button = renderer.create(<Button isLoader />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button type "button"', () => {
        const button = renderer.create(<Button type={'button'} />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button type "submit"', () => {
        const button = renderer.create(<Button type={'submit'} />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button "сортировка по возрастанию"', () => {
        const button = renderer.create(<Button sorting={Direction.Ascending} />).toJSON();
        expect(button).toMatchSnapshot();
    })

    it('Компонент Button "сортировка по убыванию"', () => {
        const button = renderer.create(<Button sorting={Direction.Descending} />).toJSON();
        expect(button).toMatchSnapshot();
    })
})

describe('Тест для слушателей событий компонента Button', () => {
    it('Нажатие на кнопку работает, колбэк вызывается корректно', () => {
        const onClick = jest.fn();
        render(<Button text={'text'} onClick={onClick}/>)
        const button = screen.getByText('text');
        fireEvent.click(button)
    })
})
