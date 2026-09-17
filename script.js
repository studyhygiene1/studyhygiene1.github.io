function initMobileNav(){

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if(!navToggle || !siteNav){
return;
}

function closeNav(){
siteNav.classList.remove("nav-open");
navToggle.setAttribute("aria-expanded","false");
}

function toggleNav(){
const isOpen = siteNav.classList.toggle("nav-open");
navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

navToggle.addEventListener("click",toggleNav);

siteNav.querySelectorAll("a").forEach(function(link){
link.addEventListener("click",closeNav);
});

document.addEventListener("keydown",function(event){
if(event.key === "Escape"){
closeNav();
}
});

}

document.addEventListener("DOMContentLoaded",initMobileNav);

async function loadBookingModals(){

const root = document.getElementById("booking-modal-root");

if(!root){
return;
}

try{

const response = await fetch("booking-modal.html");
const html = await response.text();

root.innerHTML = html;

}catch(err){

console.error("Failed to load booking modals:",err);
return;

}

// Script tags inserted via innerHTML do not execute automatically,
// so the TidyCal embed script must be created and appended manually.
const tidycalScript = document.createElement("script");
tidycalScript.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
tidycalScript.async = true;
document.body.appendChild(tidycalScript);

initBookingModals();

}

function initBookingModals(){

const triggers = document.querySelectorAll(".booking-trigger");
const closeButtons = document.querySelectorAll(".booking-modal-close");
const modals = document.querySelectorAll("#booking-modal-root .modal");

if(!modals.length){
return;
}

let lastFocusedElement = null;

function closeAllBookingModals(){

modals.forEach(function(modal){
modal.classList.remove("active");
modal.setAttribute("aria-hidden","true");
});

document.body.classList.remove("modal-open");

if(lastFocusedElement){
lastFocusedElement.focus();
}

}

triggers.forEach(function(trigger){

trigger.addEventListener("click",function(event){

event.preventDefault();

lastFocusedElement = document.activeElement;

const targetId = trigger.getAttribute("data-booking-modal");
const modal = document.getElementById(targetId);

if(modal){

modal.classList.add("active");
modal.setAttribute("aria-hidden","false");

document.body.classList.add("modal-open");

}

});

});

closeButtons.forEach(function(button){

button.addEventListener("click",function(){
closeAllBookingModals();
});

});

modals.forEach(function(modal){

modal.addEventListener("click",function(event){

if(event.target === modal){
closeAllBookingModals();
}

});

});

document.addEventListener("keydown",function(event){

if(event.key === "Escape"){
closeAllBookingModals();
}

});

}

document.addEventListener("DOMContentLoaded",loadBookingModals);
