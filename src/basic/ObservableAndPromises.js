import Rx, { Observable } from 'rx';
const { create} = Observable;

//rx와 promise의 차이
export default () => {
    //const promise = new Promise(resolve => {
    //    setTimeout(() => {
    //        console.log('promise timeout hit');
    //        resolve(42);
    //    }, 500);
    //
    //    console.log('promise start !');
    //}); //Promise는 반드시 실행되지만 Observable은 실행되지 않는다. subscribe가 되어야 실행된다.

    //promise.then(x => console.log(x)); //42


    const source = create(observer => {
        const timer = setTimeout(() => {
            console.log('observable timeout hit');
            observer.onNext(42);
        }, 1500);

        console.log('observable start !');

        return () => { //dispose 함수 자체를 리턴한다.
            console.log('dispose called');
            clearTimeout(timer);
        };
    });

    //source.forEach(x => console.log(x)); //42

    let disposable = source.forEach(x => console.log(x));

    //let disposable = source.forEach(x => console.log(x)); //이 행위 자체가 동일하다.
    //
    //let disposable = source.subscribe(x => console.log(x)); //이 행위 자체가 동일하다 .
    //생각해보면 forEach 또한 subscribe라고 생각하면 된다.

    setTimeout(() => {
        disposable.dispose();
    }, 500);
};




