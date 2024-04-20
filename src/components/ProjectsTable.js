import React from "react";
import ProjectCard from "../components/ProjectCard";

class ProjectsTable extends React.Component {
    render() {
        return (
            <div className="container" style={{ marginBottom: "10px" }}>
                <div class="row row-cols-4">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
                <div class="row row-cols-4">
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        )
    }
}

export default ProjectsTable;
