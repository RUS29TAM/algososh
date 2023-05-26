import renderer from "react-test-renderer";
import {ElementStates} from "../../../../types/element-states";
import {Column} from "../column";

describe('Тест для компонента Column', () => {
    it('Компонент Column отрисовка по индексу - тест пройден', () => {
        const column = renderer.create(<Column index={0} />).toJSON();
        expect(column).toMatchSnapshot();
    })

    it('Компонент Column отрисовка отрисовка в состоянии Default - тест пройден', () => {
        const column = renderer.create(<Column index={1} state={ElementStates.Default} />).toJSON();
        expect(column).toMatchSnapshot();
    })

    it('Компонент Column отрисовка отрисовка в состоянии Changing - тест пройден', () => {
        const column = renderer.create(<Column index={2} state={ElementStates.Changing} />).toJSON();
        expect(column).toMatchSnapshot();
    })

    it('Компонент Column отрисовка отрисовка в состоянии Modified - тест пройден', () => {
        const column = renderer.create(<Column index={3} state={ElementStates.Modified} />).toJSON();
        expect(column).toMatchSnapshot();
    })
})