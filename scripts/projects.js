const wrapper = document.querySelector(".project-wrapper");
const centerX = wrapper.offsetWidth/2;
const centerY = wrapper.offsetHeight/2;

const smile = [95, 46, 56, 62, 68, 74, 55, 36, 17];

const projectCount = 500;
const maxFollow = 200;
var a = 7;
var rotation = 0;

function renderProjects() {
    while(wrapper.firstChild){
        wrapper.removeChild(wrapper.firstChild);
    }
    projects = [];

    for(let index = 0; index < projectCount; index++){
        let projectElement = document.createElement("div");
        projectElement.classList.add("project");

        let angle = index + (rotation * Math.PI / 180);
        let dist = a * Math.sqrt(angle);

        let xCart = dist*Math.cos(angle);
        let yCart = dist*Math.sin(angle);

        projectElement.style.top = (centerY - yCart) + "px";
        projectElement.style.left = (centerX - xCart) + "px";
        projectElement.style.opacity = (1 - (index/projectCount));
        projectElement.style.filter = "hue-rotate(" + index + "deg)";

        // if(smile.includes(index)){
        //     projectElement.style.backgroundColor = "black";
        // }

        let project = {
            top: (centerY - yCart),
            left: (centerX - xCart)
        }

        wrapper.appendChild(projectElement);
        projects.push(project);
    }
}

function initProjectViewer(){
    renderProjects();

    window.addEventListener("mousemove", (e) => {
        let nX = e.clientX - centerX;
        let nY = e.clientY - centerY;

        document.querySelectorAll(".project").forEach((project, index) => {
            let oldX = projects[index].left;
            let oldY = projects[index].top;
            let closeness = 1 - (index/projectCount*1.5);

            let newX = +oldX + (+maxFollow * +nX * closeness / (centerX*2));
            let newY = +oldY + (+maxFollow * +nY * closeness / (centerY*2));

            project.style.left = newX + "px";
            project.style.top = newY + "px";
        });
    });

    setInterval(() => {
        // rotation += 1;
        // renderProjects();
    }, 1);
}

initProjectViewer();