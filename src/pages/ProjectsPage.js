import React, { useState } from "react";
import NavBar from "../components/NavBar"
import ProjectsFilter from "../components/ProjectsFilter";
import ProjectsTable from "../components/ProjectsTable";
import { PaginationControl } from "react-bootstrap-pagination-control";

function ProjectsPage() {
  const [page, setPage] = useState(1)
  return (
    <div>
      <NavBar />
      <ProjectsFilter />
      <ProjectsTable />
      <PaginationControl
        page={page}
        between={2}
        total={250}
        limit={8}
        last={true}
        changePage={(page) => {
          setPage(page)
        }}
        ellipsis={1}
      />
    </div>
  );
}

export default ProjectsPage;
