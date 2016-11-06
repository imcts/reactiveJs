import Rx, { Observable } from 'rx';
const { fromEvent, interval } = Observable;

export default () => {
    const container = document.getElementById('container');
    container.append(document.createElement('button'));

    const btn = document.getElementsByTagName('button')[0];
    btn.innerHTML = '눌러주세요';

    const clicks = fromEvent(btn, 'click');

    clicks
        .scan(s => s + 1, 0) //0부터 하나씩 계속 꺼내주는 sequence 와 같다
        //.buffer(interval(1000)) //1초마다 한번씩 실행시켜 준다 다만 click에서 들어오지 않으므로 빈 배열이 들어간다.
        //.filter(arr => arr.length) //어떻게 보면 이녀석이 더 효율적일 수 있다 어차피 interval이라면
        .buffer(clicks.throttle(1000)) //이녀석의 경우에는 무조건 보내주는건 아니기때문에 이벤트 동작의 복잡함이 살짝 존재한다
        .subscribe(x => sendValue(x));

    const sendValue = arr => {
        console.log(arr);
    };
};




