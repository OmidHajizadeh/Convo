import Skeleton from "@mui/material/Skeleton";

const ChatLoadingPage = () => {
  return (
    <div className="h-full flex flex-col relative overflow-auto bg-chat-pattern bg-blend-darken dark:bg-black/60 bg-fixed bg-center bg-repeat bg-contain">
      <div className="header flex p-4 bg-slate-50 dark:bg-gray-500/50 backdrop-blur-md">
        <span className="me-3">
          <Skeleton variant="circular" width={40} height={40} />
        </span>
        <span className="w-full">
          <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 80 }} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "0.75rem", maxWidth: 200 }}
          />
        </span>
      </div>

      <div className="flex-grow flex flex-col gap-3 p-4">
        <div className="message self-start flex items-end gap-2">
          <div className="avatar w-12 hidden md:block"></div>
          <div className="text bg-slate-100 dark:bg-gray-600 rounded-md min-w-[12rem] p-3">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", maxWidth: "100%" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 120 }} />
          </div>
        </div>
        <div className="message self-start flex items-end gap-2">
          <div className="avatar w-12 hidden md:block">
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <div className="text bg-slate-100 dark:bg-gray-600 rounded-md min-w-[12rem] p-3">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", maxWidth: "100%" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 70 }} />
          </div>
        </div>

        <div className="message self-end flex items-end gap-2">
          <div className="text bg-slate-100 dark:bg-gray-600 rounded-md min-w-[12rem] p-3">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", maxWidth: "100%" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 90 }} />
          </div>
          <div className="avatar w-12"></div>
        </div>
        <div className="message self-end flex items-end gap-2">
          <div className="text bg-slate-100 dark:bg-gray-600 rounded-md min-w-[12rem] p-3">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", maxWidth: "100%" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "1rem", maxWidth: 40 }} />
          </div>
          <div className="avatar w-12">
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        </div>

      </div>
      <div className="h-20 bg-slate-100 dark:bg-primary-dark p-3 flex items-center justify-stretch">
        <Skeleton
          variant="rectangular"
          className="rounded-full w-full"
          height={40}
        />
      </div>
    </div>
  );
};

export default ChatLoadingPage;
