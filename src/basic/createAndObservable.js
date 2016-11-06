import Rx, { Observable } from 'rx';
const { create } = Observable;

export default () => {
    let source = create(observable => {
        console.log('source');
        observable.next(3);
        observable.next(3);
        observable.next(3);

        observable.onCompleted();

        return () => {
            //dispose 하거나 구독자에게 publish를 끝냈을때 진입.
            console.log('dispose!!');
        };
    });

    const sub1 = source.subscribe(x => {
        console.log(x, 'sub1');
    });


    const sub2 = source.subscribe(x => {
        console.log(x, 'sub2');
    });

//구독 중지.
    sub1.dispose();

    setTimeout(() => {
        source.subscribe(x => {
            console.log(x, 'sub3');
        });
    }, 1000);
};




