import {Loader} from '../Loader';

interface propsChildren {
   children:React.ReactChild | React.ReactNode;
}

export const LayoutLoader = () => (
   <div className="main">
      <Loader />
   </div>
);

export const LayoutPage = ({children}: propsChildren) => (
   <div className="mainLoader">
      {children}
   </div>
);

