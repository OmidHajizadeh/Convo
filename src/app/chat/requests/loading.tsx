import { Skeleton } from "@mui/material";

const RequestsLoadingPage = () => {
  return (
    <div className="p-4 h-full">
      <ul className="space-y-3">
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
        <li className="rounded-lg flex p-4 bg-slate-200">
          <span className="me-3">
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
    </div>
  );
};

export default RequestsLoadingPage;
