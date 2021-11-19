const wrapper = document.querySelector(".project-wrapper");
const cta = document.querySelector(".cta");
const centerX = wrapper.offsetWidth/4*3;
const centerY = wrapper.offsetHeight/2;

const smile = [95, 46, 56, 62, 68, 74, 55, 36, 17];

const projectCount = 1000;
const maxFollow = 250;
const rotationIntensity = 20;
let a = 7;
let rotation = -1000;
let isOpen = false;
let nX = 0;
let nY = 0;
let mX = 0;
let mY = 0;

function renderProjects() {
    while(wrapper.firstChild){
        wrapper.removeChild(wrapper.firstChild);
    }
    projects = [];

    for(let index = 0; index < projectCount; index++){
        let projectElement = document.createElement("div");
        projectElement.classList.add("project");

        let angle = index; // + (rotation * Math.PI / 180);
        let dist = a * Math.sqrt(angle+rotation);
        // dist = Math.cos(dist)*100;

        let xCart = dist*Math.cos(angle);
        let yCart = dist*Math.sin(angle);

        projectElement.style.top = (centerY - yCart) + "px";
        projectElement.style.left = (centerX - xCart) + "px";
        projectElement.style.opacity = (1 - (index/projectCount));
        projectElement.style.filter = "hue-rotate(" + index/6 + "deg)";
        projectElement.style.zIndex = 1000-index;
        // projectElement.style.transform = "rotate(" + Math.asin(xCart/yCart)*180/Math.PI + "rad)"

        // if(smile.includes(index)){
        //     projectElement.style.backgroundColor = "black";
        // }

        // if(index < 150){
            // projectElement.style.backgroundColor = "blue";
        // }

        let project = {
            top: (centerY - yCart),
            left: (centerX - xCart)
        }

        wrapper.appendChild(projectElement);
        projects.push(project);
    }

    updateProjectPosition();

}

function updateProjectPosition(){
    const pcX = centerX + maxFollow*nX/centerX;
    const pcY = centerY + maxFollow*nY/centerY;

    // const spotter = document.querySelector("#spotter");
    // spotter.style.top = pcY + "px";
    // spotter.style.left = pcX + "px";
    // spotter.style.zIndex = "2000";

    cta.style.top = pcY - 50 + "px";
    cta.style.left = pcX - 50 + "px";

    let distanceFromCenter = Math.sqrt(Math.pow(mX - pcX, 2) + Math.pow(mY - pcY, 2));

    if(distanceFromCenter < 100 && !isOpen){
        openProject();
    }
    else if (distanceFromCenter >= 100 && isOpen){
        closeProject();
    }

    document.querySelectorAll(".project").forEach((project, index) => {
        const oldX = projects[index].left;
        const oldY = projects[index].top;
        const closeness = 1 - (index/projectCount*1);

        const newX = +oldX + (+maxFollow * (nX*(1 - index/projectCount)*2) * closeness / (centerX*2));
        const newY = +oldY + (+maxFollow * (nY*(1 - index/projectCount)*2) * closeness / (centerY*2));

        project.style.left = newX + "px";
        project.style.top = newY + "px";
    });
}

function initProjectViewer(){
    renderProjects();
    loadProject();

    cta.addEventListener("click", (e) => {
        unloadProject();
    })

    window.addEventListener("mousemove", (e) => {
        nX = e.clientX - centerX;
        nY = e.clientY - centerY;
        mX = e.clientX;
        mY = e.clientY;

        updateProjectPosition();
    });
}

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
    }, 10);
}

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
    }, 10);
}

function loadProject(){
    rotation = -1000;
    const interval = setInterval(() => {
        rotation += rotationIntensity;
        if(rotation >= 0){
            clearInterval(interval);
            rotation = 0;
        }
        renderProjects();
    }, 1);
}

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
    }, 10);
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

initProjectViewer();