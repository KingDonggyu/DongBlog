---
date: "2022-03-13"
title: "[JavaScript] Iterable"
category: "Language"
categoryColor: "#25e5bd"
tags: ["JS"]
thumbnail: "./images/JavaScript.png"
---

π‘ **λ°λ³΅ κ°λ₯ν(iterable, μ΄ν°λ¬λΈ) κ°μ²΄λ λ°°μ΄μ μΌλ°νν κ°μ²΄μ΄λ€.**

μ΄ν°λ¬λΈ μ΄λΌλ κ°λμ μ¬μ©νλ©΄ **μ΄λ€ κ°μ²΄μλ  `for..of` λ°λ³΅λ¬Έμ μ μ©ν  μ μλ€.**

<br />

λ°°μ΄μ λνμ μΈ μ΄ν°λ¬λΈμ΄λ€. 

λ°°μ΄ μΈμλ λ€μμ λ΄μ₯ κ°μ²΄κ° λ°λ³΅ κ°λ₯νλ€. (λ¬Έμμ΄ μ­μ μ΄ν°λ¬λΈμ μμ΄λ€)

**λ°°μ΄μ΄ μλ κ°μ²΄κ° μλλ°,** μ΄ κ°μ²΄κ° μ΄λ€ κ²λ€μ μ»¬λ μ(λͺ©λ‘, μ§ν© λ±)μ λνλ΄κ³  μλ κ²½μ°, 

`for..of` λ¬Έλ²μ μ μ©ν  μλ§ μλ€λ©΄ μ»¬λ μμ μννλλ° μ μ©ν  κ²μ΄λ€!

μ΄κ² κ°λ₯νλλ‘ νλ €λ©΄ μ΄λ»κ² ν΄μΌν κΉ?

<br />

## Symbol.iterator

```js
let range = {
  from: 1,
  to: 5
};

// λͺ©ν: for(let num of range) ... num = 1,2,3,4,5
```

μ `range`λ₯Ό μ΄ν°λ¬λΈλ‘ λ§λ€λ €λ©΄, μ¦ **`for..of`κ° λμνλλ‘ νλ €λ©΄** κ°μ²΄μ `Symbol.iterator`(νΉμ λ΄μ₯ μ¬λ³Ό)λΌλ λ©μλλ₯Ό μΆκ°ν΄μΌ νλ€.

κ·Έλ κ² νλ©΄ μλμ κ°μ μΌμ΄ λ²μ΄μ§λ€.

<br />

**1. `for..of`κ° μμλμλ§μ `for..of`λ `Symbol.iterator`λ₯Ό νΈμΆνλ€.**

- `Symbol.iterator`κ° μμΌλ©΄ μλ¬κ° λ°μνλ€.

- `Symbol.iterator`λ λ°λμ μ΄ν°λ μ΄ν°(iterator, λ©μλ `next`κ° μλ κ°μ²΄)λ₯Ό λ°νν΄μΌ νλ€.

**2. μ΄ν `for..of`λ λ°νλ κ°μ²΄(μ΄ν°λ μ΄ν°)λ§μ λμμΌλ‘ λμνλ€.**

**3. `for..of`μ λ€μ κ°μ΄ νμνλ©΄, `for..of`λ μ΄ν°λ μ΄ν°μ `next()`λ₯Ό νΈμΆνλ€.**

**4. `next()`μ λ°ν κ°μ `{done: Boolean, value: any}`μ κ°μ ννμ¬μΌ νλ€.**

- `done = true`λ λ°λ³΅μ΄ μ’λ£λμμμ μλ―Ένλ€.

- `done = false` μΌλ `value`μ λ€μ κ°μ΄ μ μ₯λλ€.

<br />

```js
let range = {
    from: 1,
    to: 5
};

range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,

        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

for (let num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}
```

μ΄ν°λ¬λΈ κ°μ²΄μ ν΅μ¬μ **'κ΄μ¬μ¬μ λΆλ¦¬(Separation of concern, SoC)'** μ μλ€.

- `range`μ λ©μλ `next()`κ° μλ€.

- λμ  `range[Symbol.iterator]()`λ₯Ό νΈμΆν΄μ λ§λ  μ΄ν°λ μ΄ν° κ°μ²΄μ μ΄ κ°μ²΄μ λ©μλ `next()`μμ λ°λ³΅μ μ¬μ©λ  κ°μ λ§λ€μ΄λΈλ€.

<br />

μ΄λ κ² νλ©΄ μ΄ν°λ μ΄ν° κ°μ²΄μ λ°λ³΅ λμμΈ κ°μ²΄λ₯Ό λΆλ¦¬ν  μ μλ€!

μλμ κ°μ΄ μ΄ν°λ μ΄ν° κ°μ²΄μ λ°λ³΅ λμ κ°μ²΄λ₯Ό ν©μ³μ `range` μμ²΄λ₯Ό μ΄ν°λ μ΄ν°λ‘ λ§λ€λ©΄ μ½λκ° λ κ°λ¨ν΄μ§λ€.

```js
let range ={
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ }
        } else {
            return { done: true };
        }
    }
};

for (let num of range) {
    console.log(num);
}
```

μ΄μ  `range[Symbol.iterator]()`κ° κ°μ²΄ `range` μμ²΄λ₯Ό λ°ννλ€.

**λ°νλ κ°μ²΄μ νμ λ©μλμΈ `next()`κ° μκ³ ,** `this.current`μ λ°λ³΅μ΄ μΌλ§λ μ§νλμλμ§λ₯Ό λνλΈλ κ°λ μ μ₯λμ΄ μλ€.

νμ§λ§!

λ¨μ μ λ κ°μ `for..of` λ°λ³΅λ¬Έμ νλμ κ°μ²΄μ λμμ μ¬μ©ν  μ μλ€..

**μ΄ν°λ μ΄ν°(κ°μ²΄ μμ )κ° νλλΏμ΄μ΄μ λ λ°λ³΅λ¬Έμ΄ λ°λ³΅ μνλ₯Ό κ³΅μ νκΈ° λλ¬Έμ΄λ€.**

> `range.to`μ `Infinity`λ₯Ό ν λΉνλ©΄ λ¬΄ν λ°λ³΅λ κ°λ₯νλ€.

<br />

## iteratorλ₯Ό λͺμμ μΌλ‘ νΈμΆνκΈ°

```js
let str = "Hello";
let iterator = str[Symbol.iterator]();

while(true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value);  // H, e, l, l, o
}
```

μ΄ν°λ μ΄ν°λ₯Ό λͺμμ μΌλ‘ νΈμΆνλ κ²½μ°λ κ±°μ μμ§λ§,

**μ΄ λ°©λ²μ μ¬μ©νλ©΄ `for..of`λ₯Ό μ¬μ©νλ κ²λ³΄λ€ λ°λ³΅ κ³Όμ μ λ μ ν΅μ ν  μ μλ€λ μ₯μ μ΄ μλ€.**

- λ°λ³΅μ μμνλ€κ° μ μ λ©μΆ° λ€λ₯Έ μμμ νλ€κ° λ€μ λ°λ³΅μ μμνλ κ²κ³Ό κ°μ΄ λ°λ³΅ κ³Όμ μ μ¬λ¬ κ°λ‘ μͺΌκ°λ κ²μ΄ κ°λ₯νλ€.

<br />

## iterableκ³Ό μ μ¬ λ°°μ΄

- **μ΄ν°λ¬λΈ(iterable)** : μμμ μ€λͺν λ°μ κ°μ΄ λ©μλ `Symbol.iterator`κ° κ΅¬νλ κ°μ²΄μ΄λ€.

- **μ μ¬ λ°°μ΄(array-like)** : μΈλ±μ€μ `length` νλ‘νΌν°κ° μμ΄μ λ°°μ΄μ²λΌ λ³΄μ΄λ κ°μ²΄μ΄λ€.

μ λ μ©μ΄λ λΉμ·ν΄λ³΄μ΄μ§λ§ μμ£Ό λ€λ₯΄λ€. (ν·κ°λ¦¬μ§ μμΌλ €λ©΄ μ μ΄ν΄νμ..)

<br />

λΈλΌμ°μ  λ±μ νΈμ€νΈ νκ²½μμ μλ°μ€ν¬λ¦½νΈλ₯Ό μ¬μ©ν΄ λ¬Έμ λ₯Ό ν΄κ²°ν  λ μ΄ν°λ¬λΈ κ°μ²΄λ μ μ¬ λ°°μ΄ κ°μ²΄ λλ λ λ€μΈ κ°μ²΄λ₯Ό λ§λ  μ μλ€!

μ΄ν°λ¬λΈ κ°μ²΄(`for..of` λ₯Ό μ¬μ©ν  μ μμ)μ΄λ©΄μ μ μ¬λ°°μ΄ κ°μ²΄(μ«μ μΈλ±μ€μ `length` νλ‘νΌν°κ° μμ)μΈ **λ¬Έμμ΄**μ΄ λνμ μΈ μλ€.

<br />

μ΄ν°λ¬λΈ κ°μ²΄λΌκ³  ν΄μ μ μ¬ λ°°μ΄ κ°μ²΄λ μλλ€.

μ μ¬ λ°°μ΄ κ°μ²΄λΌκ³  ν΄μ μ΄ν°λ¬λΈ κ°μ²΄μΈ κ²λ μλλ€.

- μ μμμ `range`λ μ΄ν°λ¬λΈ κ°μ²΄μ΄κΈ΄ νμ§λ§ μΈλ±μ€λ μκ³  `length` νλ‘νΌν°λ μμΌλ―λ‘ μ μ¬ λ°°μ΄ κ°μ²΄κ° μλλ€.

- (μλ μμμ κ°μ²΄λ μ μ¬ λ°°μ΄ κ°μ²΄μ΄κΈ΄ νμ§λ§ μ΄ν°λ¬λΈ κ°μ²΄κ° μλλ€.)

```js
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

for (let item of arrayLike) {}
```

`arrayLike` κ°μ²΄μ `Symbol.iterator`κ° μμΌλ―λ‘ μλ¬κ° λ°μνλ€.

<br />

μ΄ν°λ¬λΈκ³Ό μ μ¬ λ°°μ΄μ λκ² λ°°μ΄μ΄ μλκΈ° λλ¬Έμ `push`, `pop` λ±μ λ©μλλ₯Ό μ§μνμ§ μλλ€.

μ΄λ»κ² νλ©΄ μ΄ν°λ¬λΈκ³Ό μ μ¬ λ°°μ΄μ λ°°μ΄ λ©μλλ₯Ό μ μ©ν  μ μμκΉ..?

<br />

## Array.from

**`Array.from`λ μ΄ν°λ¬λΈμ΄λ μ μ¬ λ°°μ΄μ λ°μ 'μ§μ§' `Array`λ₯Ό λ§λ€μ΄μ€λ€!**

μ΄ κ³Όμ μ κ±°μΉλ©΄ μ΄ν°λ¬λΈκ³Ό μ μ¬ λ°°μ΄μ λ°°μ΄λ©μλλ₯Ό μ¬μ©ν  μ μλ€.

```js
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};

let arr = Array.from(arrayLike);
console.log(arr.pop());  // World
```

**`Array.from`μ κ°μ²΄λ₯Ό λ°μ μ΄ν°λ¬λΈμ΄λ μ μ¬ λ°°μ΄μΈμ§ μ‘°μ¬νλ€.**

- λκ²¨ λ°μ μΈμκ° μ΄ν°λ¬λΈμ΄λ μ μ¬ λ°°μ΄μΈ κ²½μ°, μλ‘μ΄ λ°°μ΄μ λ§λ€κ³  κ°μ²΄μ λͺ¨λ  μμλ₯Ό μλ‘­κ² λ§λ  λ°°μ΄λ‘ λ³΅μ¬νλ€.

<br />

μλλ μ΄ν°λ¬λΈμ μΈμλ‘ μ¬μ©ν μμμ΄λ€.

```js
let range ={
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ }
        } else {
            return { done: true };
        }
    }
};

let arr = Array.from(range);
console.log(arr);  // 1, 2, 3, 4, 5 
```

<br />

λ, `Array.fom`μ λ§€ν(mapping) ν¨μλ₯Ό μ νμ μΌλ‘ λκ²¨μ€ μ μλ€.

```js
let arr = Array.from(range, num => num * num);
console.log(arr); // 1,4,9,16,25
```

<br />
<br />

## β» Source

π₯ ko.javascript.info