type PageFrameProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"section">;

const PageFrame = ({ children, className, ...props }: PageFrameProps) => {
  return (
    <section {...props} className={`p-4 dark:bg-gray-900/40 bg-gray-100/30 w-full min-h-full overflow-auto ${className? className: null}`}>
      {children}
    </section>
  );
};

export default PageFrame;
