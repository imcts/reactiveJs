import Rx, { Observable } from 'rx';
const { fromArray, interval } = Observable;

export default () => {
    let source = fromArray([1, 2, 3, 4, 5]);
    //아래와 같은 동작을 한다.
    //Observable.create(observer => {
    //  const arr = [1, 2, 3, 4, 5];
    //  arr.forEach(x => observer.onNext(x));
    //});

    source
        .filter(x => x % 2 === 1)
        .map((x, i, arr) => {
            console.log(x, ' : x');
            console.log(i, ' : i');
            console.log(arr, ' : arr');

            return x;
        })
        .forEach(x => console.log(x));
        //forEach를 해주는것은 subscribe해주는 것과 같은 의미를 지닌다
        //즉 map만 해주는것은 subscribe하는 것이 아니기 때문에 forEach를 해주어야 한다.
};




