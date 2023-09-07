import Skeleton from "@mui/material/Skeleton";

import PageFrame from "@/components/PageFrame";

const RequestsLoadingPage = () => {
  return (
    <PageFrame>
      <ul className="space-y-3">
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="flex flex-grow gap-4 justify-between items-center">
            <span className="w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", maxWidth: 80 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.75rem", maxWidth: 200 }}
              />
            </span>
            <span className="flex gap-4">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </span>
          </span>
        </li>
      </ul>
    </PageFrame>
  );
};

export default RequestsLoadingPage;
