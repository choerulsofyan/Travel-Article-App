import React from "react";
import { useLocation } from "react-router-dom";
import { paths } from "@/routes/paths";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface Breadcrumb {
    name: string;
    path: string;
}

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((path) => path && path !== "admin");

    let breadcrumbs: Breadcrumb[] = [{ name: "Dashboard", path: paths.admin.dashboard }];

    let currentPath = paths.admin.dashboard;
    breadcrumbs = breadcrumbs.concat(
        pathnames.map((pathname) => {
            currentPath = currentPath === "/" ? `/${pathname}` : `${currentPath}/${pathname}`;
            const routePath = Object.values(paths.admin).find((p) => p === currentPath);
            return {
                name: pathname.charAt(0).toUpperCase() + pathname.slice(1),
                path: routePath || currentPath,
            };
        }),
    );

    return (
        <nav aria-label="breadcrumb" className="p-4 bg-gray-100">
            <ol className="flex items-center space-x-2">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.path} className="flex items-center">
                        {index > 0 && <ChevronRightIcon className="h-4 w-4 text-gray-500 me-2" />}
                        {index < breadcrumbs.length - 1 ? <>{breadcrumb.name}</> : <span className="text-gray-500">{breadcrumb.name}</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
