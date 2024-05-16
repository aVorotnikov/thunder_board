import React from "react";
import ProjectCard from "../components/ProjectCard";

class ProjectsTable extends React.Component {
    render() {
        if (!this.props.projects){
            return <div></div>
        }
        return (
            <div className="container" style={{ marginBottom: "10px" }}>
                <div className="row row-cols-4">
                    {this.props.projects.slice(0, 4).map((project, i) => 
                        <ProjectCard title={project.name} description={project.description} projectId={project.id} />
                    )}
                </div>
                <div className="row row-cols-4">
                    {this.props.projects.slice(4, 8).map((project, i) => 
                        <ProjectCard title={project.name} description={project.description} projectId={project.id} />
                    )}
                </div>
            </div>
        )
    }
}

export default ProjectsTable;
