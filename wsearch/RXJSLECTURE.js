const { fromEvent } = Rx;
const { map, pluck } = RxOperators;

const input = document.createElement('input');
const container = document.querySelector('.container');
container.appendChild(input);

const observable = fromEvent(input, 'input')
  .pipe(

    // WITH MAP OPERATOR: map(event => event.target.value),

    // INSTEAD OF MAP, PLUCK! (specific one!):
    pluck('target','value'),

    map(value => parseInt(value)),
    map(value => {
      if (isNaN(value)) {
        throw new Error ('Enter a number!');
      }
      return value;
    })
  )
observable.subscribe({
  next(value) {
    console.log(`Your value is ${value}`)
  },
  error(err) {
    console.error('BAD THING HAPPEN!!!', err.message);
  }
});

// DO NOT DO THIS:
observable;

/* NEW CODE WITH OBJECT */

const { Observable } = Rx;

const observable = new Observable((subscriber)=>{
  // Throw the value 1 into our pipeline
  subscriber.next(1);

  // Marks the obaservable as complete, no more values will come out
  subscriber.complete();

  // Emit an error, no more values will come out
  subscriber.error(new Error('asdfgl'));
});

observable.subscribe({
  next(value) {
    console.log('Got a value,', value);
  },
  complete() {
    console.log('Observable is complete. Do not expect any more values');
  },
  error(err) {
    console.log('BAD THING', err.message);
  },
});

// ONLY HERE BC THIS OUTSTEDRIGER TOOL REQUIRES IT
observable;


/* NEW CODE WITH FUNCTION */

const { Observable } = Rx;

const observable = new Observable((subscriber)=>{
  // Throw the value 1 into our pipeline
  subscriber.next(1);

  // Marks the obaservable as complete, no more values will come out
  subscriber.complete();

  // Emit an error, no more values will come out
  subscriber.error(new Error('asdfgl'));
});

observable.subscribe(
  (value) => console.log('Next value:', value), // next
  (err) => console.error('BAD THING!!!', err.message), // error
  () => console.log('COMPLETE') // completion
);

// ONLY HERE BC THIS OUTSTEDRIGER TOOL REQUIRES IT
observable;


/* UNICAST OBSERVABLE */

const { Observable } = Rx;
const { tap } = RxOperators;

const observable = new Observable((subscriber)=>{
  // Throw the value 1 into our pipeline
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  // Marks the obaservable as complete, no more values will come out
  subscriber.complete();

  // Emit an error, no more values will come out
  subscriber.error(new Error('asdfgl'));
}).pipe(
  tap(value => console.log('From tap:', value))
);

observable.subscribe(
  (value) => console.log('Next value:', value), // next
  (err) => console.error('BAD THING!!!', err.message), // error
  () => console.log('COMPLETE') // completion
);

observable.subscribe((value) => {
  console.log('From second subscribe', value); // next
});


// ONLY HERE BC THIS OUTSTEDRIGER TOOL REQUIRES IT
observable;

new Observable(() => {});

/* MULTICAST OBSERVABLE */

const { Observable } = Rx;
const { tap, share } = RxOperators;

const observable = new Observable((subscriber)=>{
  // Throw the value 1 into our pipeline
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  setTimeout(() => {
    subscriber.next(4);
  }, 500);

  // Marks the obaservable as complete, no more values will come out
  // subscriber.complete();

  // Emit an error, no more values will come out
  // subscriber.error(new Error('asdfgl'));
}).pipe(
  tap(value => console.log('From tap:', value)),
  share()
);


// first observer

observable.subscribe(
  (value) => console.log('Next value:', value), // next
  (err) => console.error('BAD THING!!!', err.message), // error
  () => console.log('COMPLETE') // completion
);

// second observer

observable.subscribe((value) => {
  console.log('From second subscribe', value); // next
});


// ONLY HERE BC THIS OUTSTEDRIGER TOOL REQUIRES IT
observable;

new Observable(() => {});
