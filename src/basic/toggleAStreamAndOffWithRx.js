import Rx, { Observable } from 'rx';
const { fromEvent, interval, of } = Observable;

export default () => {
    const container = document.getElementById('container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const display = document.createElement('div');

    container.append(checkbox);
    container.append(display);

    let source = interval(100).map(() => '.');

    let checked = fromEvent(checkbox, 'change')
        .map(e => e.target.checked);


        checked
            .filter(x => x === true)
            .flatMapLatest((x) => {
                console.log(x, ' inner boolean'); //boolean이 들어옴
                console.log(checked, ' : checked'); //observable 객체 init
                return source.takeUntil(checked); //해당 함수의 조건이 충족될때까지 ! checked == observable 객체이므로 가능하다.
            })
            .subscribe(x => display.innerText += x);
};




