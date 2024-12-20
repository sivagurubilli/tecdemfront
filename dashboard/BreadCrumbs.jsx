import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { GrNext } from "react-icons/gr";

const Breadcrumbs = () => {
  return (
    <Breadcrumb spacing="8px" separator={<GrNext color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink
          href="/"
          style={{
            color: "#6f42c1",
            fontSize: "28px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          href="/dashboard"
          style={{
            color: "#6f42c1",
            fontSize: "28px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
