
let listOfValues = {
	"ambition": "a strong desire to do or to achieve something, typically requiring determination and hard work",
	"competency": "the ability to do something successfully or efficiently",
	"individality": "the quality or character of a particular person or thing that distinguishes them from others of the same kind",
	"equality": "the state of being equal, especially in status, rights, and opportunities",
	"integrity": "adherence to moral and ethical principles; soundness of moral character; honesty",
	"service": "an act of helpful activity, giving aid, helpfulness",
	"dedication": "to devote wholly and earnestly, as to some person or purpose",
	"diversity": "showing a great deal of variety; very different",
	"growth": "the process of developing or maturing physically, mentally, or spiritually",
	"enjoyment": "the process of developing or maturing physically, mentally, or spiritually",
	"loyalty": "demonstrating faith to  one's oath, commitments, or obligations",
	"innovation": "change, introduction of new things or methods",
	"cooperation": "an act or instance of working or acting together for a common purpose or benefit; joint action",
	"excellence": "the quality of being outstanding or extremely good",
	"empowerment": "authority or power given to someone to do something",
	"quality": "character with respect to fineness, or grade of excellence",
	"efficiency": "accomplishment of or ability to accomplish a job with a minimum expenditure of time and effort",
	"dignity": "the state or quality of being worthy of honor or respect",
	"stewardship": "the responsible overseeing and protection of something considered worth caring for and preserving",
	"empathy": "the ability to understand and share the feelings of another",
	"success": "the accomplishment of one's goals, the attainment of wealth, position, honors, or the like",
	"courage": "the quality of spirit that enables a person to face difficulty or pain despite fear",
	"wisdom": "knowledge of what is true or right coupled with just judgment as to action",
	"independence": "not influenced or controlled by others; thinking and acting for oneself:",
	"security": "freedom from danger or risk, safety",
	"self-confidence": "belief in oneself and one's powers or abilities; self-reliance; assurance",
	"influence": "the power to be a compelling force on or produce effects on the actions, behavior, opinions, etc., of others",
	"learning": "the acquisition of knowledge or skills through experience, study, or by being taught",
	"compassion": "a feeling of deep sympathy for another who is stricken by misfortune, accompanied by a strong desire to alleviate the suffering",
	"self-discipline": "the ability to control one's feelings and overcome one's weaknesses; the ability to pursue what one thinks is right despite temptations to abandon it",
	"self-determination": "determination by oneself or itself, without outside influence", 
	"generosity": "freedom from meanness or smallness of mind or character",
	"determination": "the quality of being resolute; firmness of purpose",
	"optimism": "a disposition or tendency to look at the good side of things",
	"self-awareness": "conscious knowledge of one's own character, feelings, motives, and desires",
	"flexible": "capable of being bent without breaking, resilient, adaptable",
	"justice": "righteousness, equitableness, fairness, or moral rightness",
	"social justice": "justice in terms of the distribution of wealth, opportunities, and privileges within a society",
	"peace": "freedom from disturbance or inner turmoil; tranquility",
	"tradition": "the transmission of customs or beliefs from generation to generation, or the fact of being passed on in this way",
	"family": "any group of persons closely related by blood, as parents, children, uncles, aunts, and cousins",
	"friendship": "a relationship characterized by attachment to another by feelings of affection or personal regard",
	"love": "a feeling of warm personal attachment or deep affection, as for a parent, child, or friend",
	"humor": "the quality of being amusing or comic, especially as expressed in literature or speech",
	"acceptance": "to take or receive (something offered); receive with approval or favor",
	"health": "the general condition of the body or mind with reference to soundness and vigor",
	"beauty": "something that gives pleasure or deep satisfaction to the mind, such as from sensory manifestations (as shape, color, sound, etc.)",
	"comfort": "prosperity and the pleasant lifestyle secured by it",
	"creativity": "the use of the imagination or original ideas, especially in the production of an artistic work",
	"balance": "a condition in which different elements are equal or in the correct proportions",
	"strength": "the emotional or mental qualities necessary in dealing with situations or events that are distressing or difficult",
	"simplicity": "absence of luxury, pretentiousness, ornament, etc.; plainness",
	"prestige": "reputation or influence arising from success, achievement, rank, or other favorable attributes",
	"trust": "reliance on the integrity, strength, ability, surety, etc., of a person or thing; confidence",
	"truth": "the quality or state of being true",
	"spontaneity": "a state resulting from a natural impulse or tendency; without effort or premeditation; unconstrained and unplanned"
};

//keeps track of all value boxes as NODES
let allValBox = [];
//holds the current selected values, holds buttons
let selectedVals = []; 
//holds values we eliminated, holds buttons
let lastRejected = [];
//values that we just selected, meant for undo button
let snapshot = [];
//values that are currently on the board
let onBoard = []; 
//buttons that are still in the running
let inRound = []; 
//chosen values to display on upcoming rounds
let nextRoundVals = []; 
//the "subround" we are currently on and the total number of subrounds
let currSR = 0; 
let subrounds = 0; 
let sizeSR = 0; 


//creates the buttons wtih the values and their hover description based on inputs from above list
for(const type in listOfValues) {
	//create the button with the value and give it an ID too
	let btn = document.createElement("button");
	btn.setAttribute("type", "button"); 
	btn.innerText = `${type}`;
	btn.setAttribute("id", `${type}`);
	btn.setAttribute("class", "val-button");

	//create the value description title
	let des = document.createElement("div"); 
	let desTitle = document.createElement("span"); 
	let desTitleText = document.createTextNode(`${type}`);
	desTitle.setAttribute("class", "bold"); 

	//create text description and add to description block
	desTitle.appendChild(desTitleText); 
	let desText = document.createTextNode(": " + `${listOfValues[type]}`);
	des.appendChild(desTitle); 
	des.appendChild(desText); 
	des.classList.add("description"); 

	let div = document.createElement("div"); 
	div.appendChild(btn); 
	div.appendChild(des); 
	div.classList.add("value-box");

	const valList = document.getElementById("values-list"); 

	allValBox.push(div); 
	valList.appendChild(div);
}

//helper function to find the value box 
function findValBox(btn) {
	for(let i = 0; i < allValBox.length; i++) {
		if(allValBox[i].firstChild === btn)
			return allValBox[i]; 
	}
}

//places values into consideration and clears board
function processBoard() {
	if(selectedVals.length === 0)
		return; 
	const valList = document.getElementById("values-list");

	for(let i = 0; i < onBoard.length; ++i) {
		if(onBoard[i].id !== "deselect" && onBoard[i].id !== "chosen") {
			let valueBox = document.getElementById(onBoard[i].id).parentElement; 
			valList.removeChild(valueBox); 
			if(selectedVals.indexOf(onBoard[i]) === -1) 
				lastRejected.push(onBoard[i]); //keeps track of all the rejected values
		}
	}
	//clears the selected vals so we can begin process of sorting again
	buttons.forEach(button => button.classList.remove("selected")); 
	nextRoundVals = nextRoundVals.concat(selectedVals); //updates values considered for next round
	selectedVals= []; 
}

//display next subround (populates board)
function nextSubRound(remainder) {
	//reset what we are currently showing every round 
	snapshot = onBoard.slice(); 
	onBoard = []; 

	const valList = document.getElementById("values-list");
	
	let i = (currSR === 0) ? 0 : currSR*sizeSR + remainder;
	let end = (currSR + 1)*sizeSR + remainder; 
	
	while(i < end) {
		let valueBox = findValBox(inRound[i]);
		valList.appendChild(valueBox);
		onBoard.push(inRound[i]); 
		++i; 
	}

	currSR++; 	
}

function displayResults(rankings) {
	//change more meta aspects
	let pageTitle = document.getElementById("values-quiz");
	pageTitle.innerHTML = "Your Results"; 
	let instr = document.getElementById("instructions");
	instr.innerHTML = "";
	document.title = "Your Results"; 

	let rank = document.getElementById("values-rank"); 
	rank.innerHTML = " ";  
	let results = document.getElementById("results"); 
	ol = document.createElement("ol"); 
	results.appendChild(ol); 

	let val; 
	let title; 
	let des; 

	for(let i = rankings.length - 1; i >= 0; i--) {
		div = document.createElement("div"); 
		div.setAttribute("class", "rank-box"); 
		val = document.createElement("li");
		title = document.createElement("h2"); 
		title.innerHTML = rankings[i].id; 
		title.setAttribute("class", "results-title"); 
		des = document.createElement("p"); 
		des.innerHTML = listOfValues[rankings[i].id]; 
		des.setAttribute("class", "results-description"); 

		div.appendChild(title); 
		div.appendChild(des); 
		val.appendChild(div);  
		ol.appendChild(val); 
	}
	document.getElementById("intro").remove();
	document.getElementById("instructions").remove(); 
}

//Fisher-Yates randomized shuffling algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let compCnt = 0; 
let lrChosen = 0; 

function oneToOne(){
	let instr = document.getElementById("instructions"); 
	instr.innerHTML = "Select the one you value more."
	document.getElementById("ending").remove();

	//create left framework
	let left = document.createElement("div"); 
	left.setAttribute("class", "val-compare val-left"); 
	left.setAttribute("id", "val-left"); 
	let h1Left = document.createElement("h1"); 
	h1Left.setAttribute("id", "h1Left"); 
	h1Left.setAttribute("class", "val-left"); 
	let pLeft = document.createElement("p"); 
	pLeft.setAttribute("class", "val-left"); 

	left.addEventListener("click", selectValWrap);
	
	left.appendChild(h1Left);
	left.appendChild(pLeft);

	let hr = document.createElement("hr");

	let right = document.createElement("div"); 
	right.setAttribute("class", "val-compare val-right"); 
	right.setAttribute("id", "val-right"); 
	let h1Right = document.createElement("h1"); 
	h1Right.setAttribute("id", "h1Right");
	h1Right.setAttribute("class", "val-right");
	let pRight = document.createElement("p"); 
	pRight.setAttribute("class", "val-right"); 

	right.addEventListener("click", selectValWrap);

	right.appendChild(h1Right); 
	right.appendChild(pRight);

	//append to the values-rank portion
	let valRank = document.getElementById("values-rank");
	valRank.appendChild(left); 
	valRank.appendChild(hr);
	valRank.appendChild(right); 

	//shuffle(nextRoundVals); 
	sortTen(nextRoundVals, 0);

}

function displayComp(left, right) {

	h1Left = document.getElementById("h1Left"); 
	h1Left.innerHTML = nextRoundVals[left].id; 
	h1Left.nextSibling.innerHTML = listOfValues[nextRoundVals[left].id]; //returns description

	h1Right = document.getElementById("h1Right"); 
	h1Right.innerHTML = nextRoundVals[right].id; 
	h1Right.nextSibling.innerHTML = listOfValues[nextRoundVals[right].id]; //returns description
}

// ten-input sorting network by Waksman, 1969
function sortTen(data, chosen) {
    let swap;
    if(compCnt === 0) { 
    	displayComp(0,5); 
    	if(chosen === 0) return;
    	//reset the value to whether or not something has been selected
    	else if(chosen === 1) { swap = data[0]; data[0] = data[5]; data[5] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 1) {
    	displayComp(1,6); 
    	if(chosen === 0) return;
    	else if(chosen === 1) { swap = data[1]; data[1] = data[6]; data[6] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 2) {
    	displayComp(2,7);
    	if(chosen === 0) return;
    	else if(chosen === 1) { swap = data[2]; data[2] = data[7]; data[7] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 3) {
    	displayComp(3,8);
    	if(chosen === 0) return;
    	else if(chosen === 1) { swap = data[3]; data[3] = data[8]; data[8] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 4) {
    	displayComp(4,9);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[4]; data[4] = data[9]; data[9] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 5) {
    	displayComp(0,3);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[0]; data[0] = data[3]; data[3] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 6) {
    	displayComp(5,8);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[5]; data[5] = data[8]; data[8] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 7) {
		displayComp(1,4);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[1]; data[1] = data[4]; data[4] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 8) {
    	displayComp(6,9);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[6]; data[6] = data[9]; data[9] = swap; } chosen = 0; compCnt++; }
    if(compCnt === 9) {
    	displayComp(0,2);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[0]; data[0] = data[2]; data[2] = swap; } chosen = 0; compCnt++; }   
    if(compCnt === 10) {
		displayComp(3,6);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[3]; data[3] = data[6]; data[6] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 11) {
    	displayComp(7,9);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[7]; data[7] = data[9]; data[9] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 12) {
    	displayComp(0,1);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[0]; data[0] = data[1]; data[1] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 13) {
    	displayComp(2,4);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[2]; data[2] = data[4]; data[4] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 14) {
    	displayComp(5,7);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[5]; data[5] = data[7]; data[7] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 15) {
    	displayComp(8,9);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[8]; data[8] = data[9]; data[9] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 16) {
    	displayComp(1,2);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[1]; data[1] = data[2]; data[2] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 17) {
    	displayComp(3,5);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[3]; data[3] = data[5]; data[5] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 18) {
    	displayComp(4,6);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[4]; data[4] = data[6]; data[6] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 19) {
    	displayComp(7,8);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[7]; data[7] = data[8]; data[8] = swap; } chosen = 0; compCnt++; }  
    if(compCnt === 20) {
    	displayComp(1,3);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[1]; data[1] = data[3]; data[3] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 21) {
    	displayComp(4,7);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[4]; data[4] = data[7]; data[7] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 22) {
    	displayComp(2,5);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[2]; data[2] = data[5]; data[5] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 23) {
    	displayComp(6,8);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[6]; data[6] = data[8]; data[8] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 24) {
    	displayComp(2,3);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[2]; data[2] = data[3]; data[3] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 25) {
    	displayComp(4,5);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[4]; data[4] = data[5]; data[5] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 26) {
    	displayComp(6,7);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[6]; data[6] = data[7]; data[7] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 27) {
    	displayComp(3,4);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[3]; data[3] = data[4]; data[4] = swap; } chosen = 0; compCnt++; } 
    if(compCnt === 28) {
    	displayComp(5,6);
    	if(chosen === 0) return;
    	else if (chosen === 1) { swap = data[5]; data[5] = data[6]; data[6] = swap; } chosen = 0; compCnt++; } 

    displayResults(nextRoundVals); 
}

//sets guidelines for next round
function bigRound() {
	processBoard(); 

	let instr = document.getElementById("instructions");
	instr.innerHTML = "Please choose what you value <i>most</i>. Try to eliminate at least one value.";

	if(currSR === subrounds || subrounds === 1) { //last round or we just started
		if(nextRoundVals.length <= 10) {
			finalStage = true; 
			//go straight to ranking
			if(nextRoundVals.length === 10) {
				oneToOne(); 
				return; 
			}
			else if(10-nextRoundVals === lastRejected.length) {
				nextRoundVals.concat(lastRejected); 
				oneToOne(); 
				return; 
			}
			//prepare to have a full 10 values to rank
			onBoard = []; 
			const valList = document.getElementById("values-list");
			console.log(lastRejected); 
			for(let i = 0; i < lastRejected.length; ++i) {
				let valueBox = findValBox(lastRejected[i]);
				valList.appendChild(valueBox);
				onBoard.push(lastRejected[i]); 
			}
			let instructions = document.getElementById("instructions");
			let val = (10-nextRoundVals.length === 1) ? "value" : "values"; 
			instructions.innerHTML = "Choose " + (10-nextRoundVals.length) + " more " + val + "."; 
			return; 
		}
		//prepare to reset for next round
		else {
			inRound = nextRoundVals.slice(); 
			nextRoundVals = []; 
			lastRejected = []; 
			currSR = 0; 

			//set subround guidelines here
			if(inRound.length >= 24)
				sizeSR = 12; 
			else //if(inRound.length >= 16)
				sizeSR = 8; 
			/*else
				sizeSR = 4;  */
			subrounds = Math.trunc(inRound.length/sizeSR); 
		}
	}

	nextSubRound(inRound.length % sizeSR); 
}




function selectVal(btn) {
	console.log(btn);
	if(btn.id !== "deselect" && btn.id !== "chosen" && btn.className !== "val-left" && btn.className !== "val-right" &&
		btn.className !== "val-compare val-left" && btn.className !== "val-compare val-right" && btn.id !== "selectAll"){
		if(btn.classList.contains("selected")) {
			btn.classList.remove("selected");  
			let idx = selectedVals.indexOf(btn); 
			if (idx !== -1) 
				selectedVals.splice(idx, 1);
		}
		else {
			btn.classList.add("selected");
			btn.nextSibling.style.display = "none"; 
			selectedVals.push(btn); 
		}
	}
	
	if(btn.id === "deselect") {
		onBoard.forEach(button => button.classList.remove("selected")); 
		selectedVals = [];
	}
	else if(btn.id === "selectAll") {
		onBoard.forEach(button => button.classList.add("selected")); 
		selectedVals = onBoard.slice(); 
	}

	else if(btn.id === "chosen"){	
		//check if any values are even selected
		if(finalStage) {
			if(selectedVals.length !== 10-nextRoundVals.length) {
				alert("Must choose " + (10-nextRoundVals.length) + " values");
			}
			else {
				console.log("yes"); 
				processBoard(); 
				oneToOne(); 
			}
			return; 
		}
		let intro = document.getElementById("intro"); 
		intro.style.display = "none"; 
		if(selectedVals.length == 0){
			alert("Must choose at least one value"); 
		}
		else {
			let size = document.getElementById("ending").children.length;
			if(size !== 3) {
				let selectAll = document.createElement("button"); 
				selectAll.setAttribute("type", "button");
				selectAll.setAttribute("id", "selectAll"); 
				selectAll.addEventListener("click", selectValWrap);
				selectAll.innerHTML = "Select All"; 
				document.getElementById("ending").prepend(selectAll); 
			}
			bigRound(); 
		}
	}
	else if(btn.className === "val-left" || btn.className === "val-compare val-left") {
		sortTen(nextRoundVals, 1); 
	}
	else if(btn.className === "val-right" || btn.className === "val-compare val-right") {
		sortTen(nextRoundVals, -1); 
	}
}

function selectValWrap(e) {
	selectVal(e.target); 
}

const buttons = Array.from(document.querySelectorAll("button"));
inRound = buttons.slice(); 
onBoard = buttons.slice(); 
subrounds = 1; 
let finalStage = false; 
inRound.forEach(button => button.addEventListener("click", selectValWrap));

document.body.addEventListener('keydown', function(event) { 
    const key = event.key; 
    if (key === "ArrowLeft")
    	selectVal(document.getElementById("val-left")); 
    else if(key === "ArrowRight")
    	selectVal(document.getElementById("val-right")); 
        
}); 

$(document).ready(function() {
		$(".val-button").hover(
			function() {
				if(!$(this).hasClass("selected")) 
					$(this).next().show(); 
			},
			function() {
				$(this).next().hide(); 
			}	
		);
	});

	
/*  still have to implememnt selected val features 
	and put an intro page in. like hey this is a values quiz beign to take test.
	put survey inside it too. to track how many people have come to /visited the page so we can compare values.
*/

