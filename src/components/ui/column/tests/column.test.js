import renderer from "react-test-renderer";
import {ElementStates} from "../../../../types/element-states";
import {Column} from "../column";

describe('Тест для компонента Column', () => {
    it('Компонент Column отрисовка по индексу', () => {
        const column = renderer.create(<Column index={0} />).toJSON();
        expect(column).toMatchSnapshot();
    })

    it('Компонент Column отрисовка отрисовка в состоянии Default', () => {
        const column = renderer.create(<Column index={1} state={ElementStates.Default} />).toJSON();
        expect(column).toMatchSnapshot();
    })

    it('Компонент Column отрисовка отрисовка в состоянии Changing', () => {
        const column = renderer.create(<Column index={2} state={ElementStates.Changing} />).toJSON();
        expect(column).toMatchSnapshot();
    })

    it('Компонент Column отрисовка отрисовка в состоянии Modified', () => {
        const column = renderer.create(<Column index={3} state={ElementStates.Modified} />).toJSON();
        expect(column).toMatchSnapshot();
    })
})
