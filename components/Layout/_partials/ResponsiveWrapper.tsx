import { ReactNode } from 'react';

const ResponsiveWrapper = ({
  children,
}: {
  children: ReactNode,
}) => (
  // eslint-disable-next-line
  <div className="max-w-full px-4 sm:px-8 md:px-0 md:max-w-breakpoint-md lg:max-w-breakpoint-lg xl:max-w-breakpoint-xl 2xl:max-w-breakpoint-2xl mx-auto my-0">
    {children}
  </div>
);

export default ResponsiveWrapper;
