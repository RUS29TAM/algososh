import renderer from 'react-test-renderer'
import {Circle} from "../circle";
import {ElementStates} from "../../../../types/element-states";

describe('Тест для компонента Circle', () =>{
    it('Компонент Circle отрисовка компонента с символами', () => {
        const circle = renderer.create(<Circle letter={'symbol'}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка без символов', () => {
        const circle = renderer.create(<Circle letter={''}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка head', () => {
        const circle = renderer.create(<Circle head={'string'}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка tail', () => {
        const circle = renderer.create(<Circle tail={'string'}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка head c react-element', () => {
        const circle = renderer.create(<Circle head={<Circle isSmall={true}/>} />).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка tail c react-element', () => {
        const circle = renderer.create(<Circle tail={<Circle isSmall={true}/>} />).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка по индексу', () => {
        const circle = renderer.create(<Circle index={0}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка с реквизитом isSmall', () => {
        const circle = renderer.create(<Circle isSmall={true}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка в состоянии Default', () => {
        const circle = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка в состоянии Changing', () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Компонент Circle отрисовка в состоянии Modified', () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
})
