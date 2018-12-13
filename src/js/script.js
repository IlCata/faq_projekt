import App from './modules/app.js';

const app = new App();

// Toggle

function classToggle() {
	const navs = document.querySelectorAll('.Navbar__Items')

	navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}

document.querySelector('.Navbar__Link--toggle').addEventListener('click', classToggle);

// ------------------------------------------------------------------------------------- //

let js_body = document.getElementsByTagName("BODY")[0];
let js_content = document.getElementById("content");
let js_tabHead = document.getElementById("head");
let js_inputMap = new Map();

let js_current_tab_key = 0;
let js_tabs = new Map();
let js_datas = new Map();
let js_unique_id = 0;

// Accordion Functions 

function insertTab(title, text)
{
	let element = document.createElement("div");
	element.classList.add("accordion");		// Create tab-button.
	element.innerHTML = title; 
	js_tabHead.appendChild(element);
	js_tabs.set( js_unique_id, element);
	js_datas.set( js_unique_id, text);
	let unique = js_unique_id;
	element.addEventListener("click", function(){
		setCurrentIndex( unique);
	});
	js_unique_id++;
}

function lastTabKey()
{
	let iter = js_tabs.keys(), prev, curr;
	do {
  		prev = curr;
  		curr = iter.next();
		} while(!curr.done)
	return prev.value;
}

function nearestTab() 
{
	if (js_tabs.size == 0)
		return null;
	
	let iter = js_tabs.keys(), prev, curr;
	do {
  		prev = curr;
  		curr = iter.next();
		
		if (curr.done)
			return prev.value;
		} while(curr.value < js_current_tab_key) 
	return curr.value;
}

function removeCurrentTab() 
{
	removeTab(js_current_tab_key);
	let indexAfterRemove = nearestTab();
	if (indexAfterRemove == null)
		js_content.innerHTML = "(No tabs to show)";
	else
		setCurrentIndex(indexAfterRemove);
}

function removeLastTab()
{
	removeTab( lastTabKey()); 
}

function removeTab(index)
{
	js_tabHead.removeChild( js_tabs.get(index));
	js_tabs.delete(index);
	js_datas.delete(index);
}
	
function resetButtonHighlight() 
{
	js_tabs.forEach( function(btn)  { 
		btn.classList.remove("tab_selected");
	});
}
	
function setCurrentIndex(index)
{
	resetButtonHighlight();
	js_tabs.get(index).classList.add("tab_selected");
	js_content.innerHTML = js_datas.get(index);
	js_current_tab_key = index;
}

function setCurrentIndexToLast()
{
	let lastIndex = lastTabKey();
	setCurrentIndex(lastIndex);
}

// ------------------------------------------------------------------------------------- //

// Create dialog

let js_dialog = document.createElement("div");
createDialog();

// Generate overlay

let js_overlay = document.createElement("div");
js_overlay.classList.add("overlay");

// Add tab button

let js_addTab = document.getElementById("add_tab");
js_addTab.addEventListener("click", addTabForm);

// Remove tab button

let js_removeTab = document.getElementById("remove_tab");
js_removeTab.addEventListener("click", removeCurrentTab);

function createInput(parent, id, width)
{
	let js_input = document.createElement("INPUT");
	js_input.setAttribute("type", "text");
	js_input.setAttribute("placeholder", "Write here your question.");
	js_input.id = id;
	js_input.style.width = width;
	js_inputMap.set(id, js_input);
	parent.appendChild(js_input);
}

function createTextArea(parent, id, width, height)
{
	let js_textArea = document.createElement("textarea");
	js_textArea.setAttribute("placeholder", "Write here your answer.");
	js_textArea.id = id;
	js_textArea.style.width = width;
	js_textArea.style.height = height;
	js_inputMap.set(id, js_textArea);
	parent.appendChild(js_textArea);
}

function showOverlay()
{
	js_overlay.addEventListener("click", hideDialogAndOverlay);
	js_body.appendChild(js_overlay);
}

function hideOverlay()
{
	js_body.removeChild(js_overlay);
}

function hideDialogAndOverlay()
{
	hideOverlay();
	hideDialog();
}

function createDialog()
{
	let js_div0 = document.createElement("div");
	let js_div1 = document.createElement("div");
	let js_div2 = document.createElement("div");
	let js_title = document.createElement("p");
	let js_contentTitle = document.createElement("p");
	js_title.innerHTML = "Question:";
	js_title.classList.add("inputDescriptionText");
	js_div0.appendChild(js_title); 
	js_contentTitle.classList.add("inputDescriptionText");
	js_contentTitle.innerHTML = "Answer:";
	js_div1.appendChild(js_contentTitle);
	createInput( js_div0, "text0");
	createTextArea( js_div1, "text1");
	
	let js_submitButton = document.createElement("div");
	js_submitButton.classList.add("noselect");
	js_submitButton.innerHTML = "Create tab";
	js_submitButton.addEventListener("click", dialogSubmit);
	js_div2.appendChild( js_submitButton);
	
	js_dialog.appendChild(js_div0);
	js_dialog.appendChild(js_div1);
	js_dialog.appendChild(js_div2);
	js_dialog.classList.add("dialog");
	js_dialog.style.position = "absolute";
	js_dialog.style.zIndex = "1";
}

function showDialog()
{
	js_body.appendChild(js_dialog);
}

function hideDialog()
{
	js_body.removeChild(js_dialog);
}

function addTabForm()
{
	showOverlay();
	showDialog();
	document.getElementById("text0").focus();
} 

function dialogSubmit()
{
	let input0 = js_inputMap.get("text0");
	let input1 = js_inputMap.get("text1");
	let title = input0.value;
	let text = input1.value;
	if (text === "")
		text = "No text available";
	
	insertTab( title, text);
	hideDialog();
	hideOverlay();
	setCurrentIndexToLast();
	input0.value = "";
	input1.value = "";
}

// Insert Default Answers and Questions on load

window.onload = function() {
	insertTab("Lorem ipsum dolor sit amet?.","Lorem ipsum dolor, sit amet consectetur elit.");
	insertTab("Optio eveniet accusantium velit?.","Illum saepe sapiente nihil nobis dicta.");
	insertTab("Nulla nobis dicta iure beata?","Id ducimus harum debitis.");
	setCurrentIndex(0);
}




	