import Rx, { Observable } from 'rx';
import $ from 'jquery';

const { fromPromise, fromEvent, just } = Observable;

export default () => {
    //container
    const container = document.getElementById('container');

    //create refresh btn
    const refreshBtn = document.createElement('button');
    refreshBtn.innerText = 'refresh';
    container.append(refreshBtn);


    //create refresh Stream
    //구독자 수만큼 subscribe 하기 때문에 3번의 request 발생.
    const refreshClickStream = fromEvent(refreshBtn, 'click').map(() => 'https://api.github.com/users?since=' + Math.floor(Math.random() * 500));

    //create start Stream
    const startupRequestStream = just('http://api.github.com/users'); //onNext -> onCompleted

    //merge stream
    const mergeStream = startupRequestStream
            .merge(refreshClickStream) //merge to click stream.
            .flatMap(url => fromPromise($.getJSON(url))) //get Data and Promise flatMap 의 역할에 대해 조금더 알아볼 필요 있음.
            .map(users => users[Math.floor(Math.random() * users.length)]); //users.length = 30; 하지만 하나의 스트림이기 때문에 1개만 return.

    const subscribe = (stream, dom) => stream.subscribe(user => user ? dom.innerHTML = `<img src="${user.avatar_url}">` : null);

    //create dom and subscribe
    Array(...Array(3))
        .forEach(() => {
            const div = document.createElement('div');
            container.append(div);

            //do subscribe
            subscribe(mergeStream, div);
        });
};




