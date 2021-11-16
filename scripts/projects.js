const wrapper = document.querySelector(".project-wrapper");
const projects = ["project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3","project1", "project2", "project3",];
const multiplier = document.querySelector(".angle-multiplier");

renderProjects();

function renderProjects() {
    const centerX = wrapper.offsetWidth/2;
    const centerY = wrapper.offsetHeight/2;
    console.log(centerX);
    projects.forEach((project, index) => {
            let projectElement = document.createElement("div");
            projectElement.classList.add("project");
            
            let angle = getFibonacciAt(index)/multiplier.value;
            let dist = index*2;

            let xCart = dist*Math.cos(angle);
            let yCart = dist*Math.sin(angle);

            
            projectElement.style.top = (centerY - yCart) + "px";
            projectElement.style.left = (centerX - xCart) + "px";
            
            console.log(angle, index);
            wrapper.appendChild(projectElement);
        }
    );
}

function getFibonacciAt(n)
{
    if (n == 0) return 0;
    if (n == 1) return 1;

    let prevPrev = 0;
    let prev = 1;
    let result = 0;

    for (let i = 2; i <= n; i++)
    {
        result = prev + prevPrev;
        prevPrev = prev;
        prev = result;
    }
    return result;
}