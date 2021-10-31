import React from "react";
import Counter from "../Counter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

let getByTestId;

beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;

})

test("header renders with correct text", () => { 
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("My Counter")
})

test("counter initially start with text of 0", () => {
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0");
})

test("input contains initial value of 1", () => {
    const inputEl = getByTestId("input")

    expect(inputEl.value).toBe("1")
})

test("add button renders with +", () => {
    const addBtn = getByTestId("add-btn")

    expect(addBtn.textContent).toBe("+")
})

test("subtract button renders with -", () => {
    const subtractBtn = getByTestId("subtract-btn")

    expect(subtractBtn.textContent).toBe("-");
})

test("change value of input works correctly", () => {
    const inputEl = getByTestId("input")

    expect(inputEl.value).toBe("1");

    fireEvent.change(inputEl, {
        // we want to change the target.value to 5
        target: {
            value: "5"
        }
    })

    // once we fire the above event
    expect(inputEl.value).toBe("5")
})

test("click on plus btn adds 1 to counter", () => {
    const addBtn = getByTestId("add-btn")
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0")

    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe("1")
})

test("click on subtract btn subtracts 1 to counter", () => {
    const subtractBtn = getByTestId("subtract-btn")
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0")

    fireEvent.click(subtractBtn)

    expect(counterEl.textContent).toBe("-1")
})

test("changing input value then clicking on add button works correctly", () => {
    const addBtn = getByTestId("add-btn")
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")

    // initial value of counter
    expect(counterEl.textContent).toBe("0")

    // change input value to 5
    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    // click on button
    fireEvent.click(addBtn)

    // expect counter to be 5
    expect(counterEl.textContent).toBe("5")
})

test("changing input value then clicking on subtract button works correctly", () => {
    const subtractBtn = getByTestId("subtract-btn")
    const inputEl = getByTestId("input")
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0")
  
    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    fireEvent.click(subtractBtn)

    expect(counterEl.textContent).toBe("-5")
})

test("adding and then subtracting leads to the correct counter number", () => {
    const addBtn = getByTestId("add-btn")
    const subtractBtn = getByTestId("subtract-btn")
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")

    expect(counterEl.textContent).toBe("0")

    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }
    })

    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(subtractBtn)
    fireEvent.click(subtractBtn)

    expect(counterEl.textContent).toBe("20")

    fireEvent.change(inputEl, {
      target: {
        value: "5",
      },
    });

    fireEvent.click(addBtn);
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);

    expect(counterEl.textContent).toBe("15");

})

test("counter contains correct className", () => {
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")
    const addBtn = getByTestId("add-btn")
    const subtractBtn = getByTestId("subtract-btn")

    expect(counterEl.className).toBe("")

    fireEvent.change(inputEl, {
        target: {
            value: "50"
        }
    })

    fireEvent.click(addBtn) // 50

    expect(counterEl.className).toBe("")

    fireEvent.click(addBtn); //100

    expect(counterEl.className).toBe("green");

    fireEvent.click(addBtn); //150

    expect(counterEl.className).toBe("green");

    fireEvent.click(subtractBtn); // 100
    fireEvent.click(subtractBtn); // 50

    expect(counterEl.className).toBe("");

    fireEvent.click(subtractBtn); // 0
    fireEvent.click(subtractBtn); // -50
    fireEvent.click(subtractBtn); // -150
    fireEvent.click(subtractBtn); // -200

    expect(counterEl.className).toBe("red");
})