---
title: 深入理解javaScript闭包
date: 2024/10/24
tags:
 - JavaScript
---

在 JavaScript 中，闭包 (Closure) 是一个我们经常听到，甚至可能在不经意间就用到的概念。但要真正深入理解它，并能自如地运用它，就需要我们花点时间去探索其背后的原理。很多开发者可能认为闭包就是“函数能记住它被创建时的环境”，这没错，但闭包的强大和微妙之处远不止于此。

### 什么是词法作用域？闭包的基石

在理解闭包之前，我们必须先掌握 **词法作用域 (Lexical Scoping)**，也叫静态作用域。

简单来说，词法作用域意味着**函数的作用域在函数定义的时候就已经决定了，而不是在函数调用的时候**。无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定。

```javascript
function outerFunction() {
  const outerVar = "我在外部函数！";

  function innerFunction() {
    console.log(outerVar); // innerFunction 可以访问 outerVar
  }

  return innerFunction;
}

const myInnerFunction = outerFunction();
myInnerFunction(); // 输出: "我在外部函数！"
```

在上面的例子中，`innerFunction` 在 `outerFunction` 内部定义。因此，`innerFunction` 的词法作用域包含了 `outerFunction` 的作用域。即使 `outerFunction` 执行完毕并返回了 `innerFunction` (此时 `outerFunction` 的执行上下文原则上已经销毁了)，`myInnerFunction` (即 `innerFunction`) 依然能够访问 `outerVar`。

这就是词法作用域在起作用。`innerFunction` “记住”了它被定义时的词法环境。

---

### 那么，到底什么是闭包？

基于词法作用域，我们可以这样定义闭包：

**闭包是指那些能够访问自由变量的函数。**
这里的“自由变量”是指在函数中使用的，但既不是函数参数也不是函数的局部变量。换句话说，这些变量位于定义该函数的外部作用域中。

**更通俗地说，当一个函数能够记住并访问它所在的词法作用域，即使它在其词法作用域之外执行时，这就产生了闭包。**

在上面的例子中，`myInnerFunction` 就是一个闭包。它“关闭”了对 `outerVar` 的访问权限。

**闭包的核心组成：**
1.  **函数本身**
2.  **创建该函数时所处的词法环境** (包括该环境中的所有局部变量)

---

### 闭包是如何工作的？作用域链的魔法

当一个函数被创建时，JavaScript 引擎会为其创建一个作用域链 (Scope Chain)。这个作用域链是一个对象列表，用于变量查找。

1.  **函数自身的活动对象 (Activation Object)**：包含函数的命名参数、局部变量和 `arguments` 对象。
2.  **外部函数的作用域对象**：如果函数是嵌套的，它会包含其外部函数的作用域对象。
3.  **全局作用域对象 (Global Object)**：作用域链的顶端。

当 `innerFunction` 被调用时，它需要访问 `outerVar`。JavaScript 引擎会：
1.  首先在 `innerFunction` 自己的作用域中查找 `outerVar`。没找到。
2.  接着沿着作用域链向上，到 `outerFunction` 的作用域中查找。找到了！

即使 `outerFunction` 已经执行完毕，其作用域对象（包含 `outerVar`）仍然被闭包 `innerFunction` 引用着，因此不会被垃圾回收机制回收。这就是闭包能够“记住”外部变量的秘密。

---

### 闭包的常见应用场景

理解了闭包是什么以及它如何工作，我们来看看它在实际开发中的强大用途。

1.  **数据封装和私有变量 (Data Encapsulation and Private Variables)**

    JavaScript 本身没有像 Java 或 C++ 那样的 `private` 关键字来创建私有成员。但闭包提供了一种实现类似功能的方式。

    ```javascript
    function createCounter() {
      let count = 0; // count 是一个“私有”变量

      return {
        increment: function() {
          count++;
          console.log(count);
        },
        decrement: function() {
          count--;
          console.log(count);
        },
        getCount: function() {
          return count;
        }
      };
    }

    const counter1 = createCounter();
    counter1.increment(); // 输出: 1
    counter1.increment(); // 输出: 2
    console.log(counter1.getCount()); // 输出: 2
    // console.log(counter1.count); // 错误！无法直接访问 count

    const counter2 = createCounter(); // counter2 有自己的 count，与 counter1 独立
    counter2.increment(); // 输出: 1
    ```
    在这个例子中，变量 `count` 只能通过返回对象中的方法来访问和修改，外部无法直接触及 `count`，从而实现了数据的封装和保护。

2.  **函数工厂 (Function Factories)**

    闭包可以用来创建特定功能的函数。

    ```javascript
    function createMultiplier(factor) {
      return function(number) {
        return number * factor;
      };
    }

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    console.log(double(5)); // 输出: 10
    console.log(triple(5)); // 输出: 15
    ```
    `createMultiplier` 返回的函数都是闭包，它们分别“记住”了传递给 `createMultiplier` 的 `factor` 值。

3.  **回调函数和事件处理器 (Callbacks and Event Handlers)**

    在异步编程中，例如事件监听或 `setTimeout`，闭包非常有用，因为它们可以保持对外部状态的引用。

    ```javascript
    function setupButtonHandler(buttonId, message) {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener('click', function() { // 这个匿名函数是一个闭包
          console.log(message); // 它可以访问外部的 message 变量
        });
      }
    }

    setupButtonHandler('myButton', '按钮被点击了！');
    ```
    当按钮被点击时，即使 `setupButtonHandler` 函数早已执行完毕，事件处理函数（闭包）仍然能够访问并使用 `message` 变量。

4.  **模块化 (Module Pattern)**

    在 ES6 模块出现之前，闭包是实现模块化开发模式的主要方式之一。它允许我们创建拥有私有状态和公共接口的模块。

    ```javascript
    const myModule = (function() {
      // 私有变量和函数
      const privateVar = "我是私有的";
      function privateFunction() {
        console.log("调用了私有函数");
      }

      // 公共接口
      return {
        publicVar: "我是公共的",
        publicFunction: function() {
          console.log("调用了公共函数");
          privateFunction(); // 可以访问模块内的私有成员
          console.log(privateVar);
        }
      };
    })(); // 立即执行函数表达式 (IIFE)

    myModule.publicFunction();
    // 输出:
    // 调用了公共函数
    // 调用了私有函数
    // 我是私有的
    // console.log(myModule.privateVar); // 错误，无法访问
    ```

---

### 使用闭包的注意事项

虽然闭包非常强大，但在使用时也需要注意一些潜在问题：

1.  **内存消耗 (Memory Consumption)**

    因为闭包会使其外部函数的变量对象一直保存在内存中，所以如果过度使用闭包，或者闭包本身引用了非常大的对象，可能会导致比预期更高的内存消耗。尤其是在一些老旧的浏览器或对性能要求极高的场景下需要特别注意。
    不过，现代 JavaScript 引擎在垃圾回收方面做了很多优化，通常情况下不必过分担心，但理解其机制总是有益的。

2.  **循环中的闭包 (Closures in Loops)**

    这是一个经典的闭包陷阱，尤其是在使用 `var` 声明循环变量时。

    ```javascript
    function createFunctions() {
      const funcs = [];
      for (var i = 0; i < 3; i++) {
        funcs.push(function() {
          console.log(i);
        });
      }
      return funcs;
    }

    const functions = createFunctions();
    functions[0](); // 输出: 3
    functions[1](); // 输出: 3
    functions[2](); // 输出: 3
    ```
    为什么都是 3？因为循环中创建的三个函数闭包共享了同一个词法环境，而在这个环境中，变量 `i` 的最终值是 3 (循环结束条件)。当这些函数被调用时，它们访问的是 `i` 当前的值。

    **解决方案：**
    * **使用 IIFE (立即执行函数表达式)**:
        ```javascript
        function createFunctionsIIFE() {
          const funcs = [];
          for (var i = 0; i < 3; i++) {
            (function(saved_i) { // IIFE 创建新的作用域
              funcs.push(function() {
                console.log(saved_i);
              });
            })(i); // 把当前的 i 传进去
          }
          return funcs;
        }
        const functionsIIFE = createFunctionsIIFE();
        functionsIIFE[0](); // 输出: 0
        functionsIIFE[1](); // 输出: 1
        functionsIIFE[2](); // 输出: 2
        ```
    * **使用 `let` 或 `const` (ES6)**:
        `let` 和 `const` 具有块级作用域，它们为循环的每次迭代创建一个新的词法环境。
        ```javascript
        function createFunctionsLet() {
          const funcs = [];
          for (let i = 0; i < 3; i++) { // let 会为每次迭代创建新的 i
            funcs.push(function() {
              console.log(i);
            });
          }
          return funcs;
        }
        const functionsLet = createFunctionsLet();
        functionsLet[0](); // 输出: 0
        functionsLet[1](); // 输出: 1
        functionsLet[2](); // 输出: 2
        ```
        这是目前最简洁和推荐的做法。

---

### 总结

闭包是 JavaScript 中一个基础且强大的特性。它源于词法作用域，使得函数能够“记住”并持续访问其定义时的环境。

**核心要点：**
* 闭包让函数可以访问定义时的外部作用域变量。
* 即使外部函数已经执行完毕，只要闭包存在，相关的外部变量就不会被回收。
* 闭包广泛应用于数据封装、函数工厂、回调、模块化等场景。
* 注意闭包可能带来的内存问题和在循环中的经典陷阱。

真正理解闭包，能够帮助我们写出更优雅、更健壮、更模块化的 JavaScript 代码。