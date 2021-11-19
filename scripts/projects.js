const wrapper = document.querySelector(".project-wrapper");
const cta = document.querySelector(".cta");
const centerX = wrapper.offsetWidth/2;
const centerY = wrapper.offsetHeight/2;

const projectCount = 1000;
const maxFollow = 850;
const rotationIntensity = 50;
let projectElements;
let a = 12;
let rotation = -1000;
let isOpen = false;
let nX = 0;
let nY = 0;
let mX = 0;
let mY = 0;
let inPosition = true;

let wrapperWidth = wrapper.offsetWidth;
let wrapperHeight = wrapper.offsetHeight;

//INITIAL SETUP
function initProjectViewer(){
    loadProject();

    cta.addEventListener("click", (e) => {
        unloadProject();
    })

    // window.addEventListener("mousemove", (e) => {
    //     nX = e.clientX - centerX;
    //     nY = e.clientY - centerY;
    //     mX = e.clientX;
    //     mY = e.clientY;

    //     updateProjectPosition();
    // });
    updateProjectPosition();
}

//GENERATE ELEMENTS
function generateProjects(){
    //Remove all child elements
    while(wrapper.firstChild){
        wrapper.removeChild(wrapper.firstChild);
    }
    projects = [];

    //Create new elements
    for(let index = 0; index < projectCount; index++){
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");

        const project = {top: 0, left: 0 };

        //Custom styling based on index
        projectElement.style.opacity = (1 - (index/projectCount));
        projectElement.style.zIndex = 1000-index;

        //Add to DOM
        wrapper.appendChild(projectElement);
        projects.push(project);
    }

    projectElements = wrapper.querySelectorAll(".project");
}

//SET PROJECTS POSITION
function renderProjects() {
    for(let index = 0; index < projects.length; index++){
        const angle = index;
        const distMultiplier = 0.5*Math.tan(index/projectCount*Math.PI/3) + 1;
        const dist = a * Math.sqrt(angle+rotation) * distMultiplier;

        projects[index] = {
            //Turn poral coordinates to cartesian
            top: centerY - dist*Math.sin(angle),
            left: centerX - dist*Math.cos(angle)
        }
    }

    updateProjectPosition();
}

//INTRO ANIMATION
function loadProject(){
    rotation = -1200;
    generateProjects();
    const interval = setInterval(() => {
        rotation += 10;
        if(rotation >= 0){
            clearInterval(interval);
            rotation = 0;
        }
        renderProjects();
    }, 1);
}

//UPDATE POSITION
function updateProjectPosition(){
    const pcX = centerX + maxFollow*nX/wrapperWidth;
    const pcY = centerY + maxFollow*nY/wrapperHeight;

    cta.style.top = pcY - 50 + "px";
    cta.style.left = pcX - 50 + "px";

    const distanceFromCenter = Math.sqrt(Math.pow(mX - pcX, 10) + Math.pow(mY - pcY, 2));

    // if(distanceFromCenter < 40 && !isOpen){
    //     openProject();
    // }
    // else if (distanceFromCenter >= 40 && isOpen){
    //     closeProject();
    // }

    projectElements.forEach((project, index) => {
        const orgX = projects[index].left;
        const orgY = projects[index].top;
        const closeness = 1 - index/projectCount;

        const diffX = maxFollow*nX*Math.pow(closeness, 2)/wrapperWidth;
        const diffY = maxFollow*nY*Math.pow(closeness, 2)/wrapperHeight;

        project.style.left = orgX + diffX + "px";
        project.style.top = orgY + diffY + "px";
    });
}

//OPEN CTA
function openProject(){
    const openingInterval = setInterval(() => {
        rotation += rotationIntensity;
        if(rotation >= 100){
            cta.style.opacity = 1;
            clearInterval(openingInterval);
            rotation = 100;
            isOpen = true;
        }
        renderProjects();
    }, 1);
}

//CLOSE CTA
function closeProject(){
    cta.style.opacity = 0;
    const closingInterval = setInterval(() => {
        rotation -= rotationIntensity;
        if(rotation <= 0){
            clearInterval(closingInterval);
            rotation = 0;
            isOpen = false;
        }
        renderProjects();
    }, 1);
}

//OUTRO ANIMATION
function unloadProject(){
    const interval = setInterval(() => {
        rotation += rotationIntensity;
        a += 10;
        console.log(a);
        if(a >= 100){
            clearInterval(interval);
            a = 100;
            wrapper.style.opacity = 0;
            window.location = "/#/about";
        }
        renderProjects();
    }, 1);
}

function generateNewPosition(){
    const maxStep = 20;
    const pcX = centerX + maxFollow*nX/wrapperWidth;
    const pcY = centerY + maxFollow*nY/wrapperHeight;

    const randomX = Math.random()*maxStep*2 - maxStep;
    const randomY = Math.random()*maxStep*2 - maxStep;
    nX += randomX;
    nY += randomY;

    updateProjectPosition();
    // sleep(1000);
    // generateNewPosition();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

initProjectViewer();