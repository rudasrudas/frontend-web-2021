const wrapper = document.querySelector(".project-wrapper");
const centerX = wrapper.offsetWidth/2;
const centerY = wrapper.offsetHeight/2;

const projectCount = 300;
const maxFollow = 1000;
var a = 30;

function renderProjects() {
    while(wrapper.firstChild){
        wrapper.removeChild(wrapper.firstChild);
    }
    projects = [];

    for(let index = 0; index < projectCount; index++){
        let projectElement = document.createElement("div");
        projectElement.classList.add("project");

        let angle = index;
        let dist = a * Math.sqrt(angle);

        let xCart = dist*Math.cos(angle);
        let yCart = dist*Math.sin(angle);

        projectElement.style.top = (centerY - yCart) + "px";
        projectElement.style.left = (centerX - xCart) + "px";

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
            // let oldX = project.style.left.substring(0, project.style.left.length - 2);
            // let oldY = project.style.top.substring(0, project.style.top.length - 2);
            let oldX = projects[index].left;
            let oldY = projects[index].top;
            let closeness = 1 - (index/projectCount);

            let newX = +oldX + (maxFollow / nX * closeness);
            let newY = +oldY + (maxFollow / nY * closeness);

            console.log((maxFollow / nX * closeness) + " " + oldX);

            project.style.left = newX + "px";
            project.style.top = newY + "px";
        });
    });

}

initProjectViewer();