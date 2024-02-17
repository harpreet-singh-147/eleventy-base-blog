---
title: Procedural Programming Paradigm
order: 6
tags: ["posts"]
layout: "layouts/post.njk"
permalink: /blog/procedural-programming-paradigm/index.html
---

---

Procedural programming involves listing steps for the computer to follow to complete a task. It breaks down the code into parts (like functions or procedures) that do specific jobs. This simple way of programming runs the code from start to end, using the functions in the order they're needed to get the job done.

- **Listing Steps**: You outline a sequence of instructions for the computer.
- **Breaking Down Code**: The program is organized into reusable blocks, such as functions or procedures.
- **Executing Code**: The code is run top-down, from the first line to the last.
- **Order of Functions**: Functions are called as needed in the process to complete the task.

### Procedural Laundry Steps

---

```javascript
// washClothes.js

function putClothesIntoWashingMachine() {
	console.log("Clothes have been put into the washing machine.");
}

function chooseWashingMachineSettings() {
	console.log("Washing machine settings selected.");
}

function addDetergent() {
	console.log("Detergent added.");
}

function startWashingMachine() {
	console.log("Washing machine started.");
}

function removeWashingFromWashingMachine() {
	console.log("Clothes removed from the washing machine.");
}

function hangClothesToDry() {
	console.log("Clothes hung to dry.");
}

function checkIfClothesAreDry() {
	console.log("Checked: Clothes are dry.");
}

function takeDownClothes() {
	console.log("Clothes taken down from hanging.");
}

function ironClothes() {
	console.log("Ironing clothes.");
}

function foldClothes() {
	console.log("Clothes folded.");
}

function putClothesAway() {
	console.log("Clothes put away.");
}

// Function to run the entire process
function washClothes() {
	putClothesIntoWashingMachine();
	chooseWashingMachineSettings();
	addDetergent();
	startWashingMachine();
	removeWashingFromWashingMachine();
	hangClothesToDry();
	checkIfClothesAreDry();
	takeDownClothes();
	ironClothes();
	foldClothes();
	putClothesAway();
}

// Execute the washClothes process
washClothes();
```

---

This script defines a function for each step in the washing process, then calls these functions in sequence within the washClothes function to simulate completing the washing procedurally. Running washClothes() will log each step to the console, demonstrating the procedural paradigm of executing tasks in a specific order.
