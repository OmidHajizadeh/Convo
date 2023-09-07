import Skeleton from "@mui/material/Skeleton";

import PageFrame from "@/components/PageFrame";

const ChatListLoadingPage = () => {
  return (
    <PageFrame>
      <ul className="space-y-3">
        <li className="rounded-lg flex px-4 py-3 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="w-full">
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 80 }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem", maxWidth: 400 }}
            />
          </span>
        </li>
        <li className="rounded-lg flex p-4 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="w-full">
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 80 }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem", maxWidth: 400 }}
            />
          </span>
        </li>
        <li className="rounded-lg flex p-4 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="w-full">
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 80 }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem", maxWidth: 400 }}
            />
          </span>
        </li>
        <li className="rounded-lg flex p-4 bg-gray-100/80 dark:bg-gray-700/80">
          <span className="me-4">
            <Skeleton variant="circular" width={40} height={40} />
          </span>
          <span className="w-full">
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 80 }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem", maxWidth: 400 }}
            />
          </span>
        </li>
      </ul>
    </PageFrame>
  );
};

export default ChatListLoadingPage;
