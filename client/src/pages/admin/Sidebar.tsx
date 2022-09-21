import React, { FC } from "react";
import useStore from "../../store/useStore";
import staticPath from "../../utils/staticPath";

interface Props {
  className: string;
  children?: React.ReactNode;
}

const Sidebar: FC<Props> = (props) => {
  const { className } = props;
  const [state, dispatch] = useStore();

  return (
    <div className={className}>
      {state.auth && (
        <div className="dashboard-user">
          <div className="avatar">
            <img src={staticPath(state.auth.avatar)} alt="" />
          </div>
          <h4 className="username">
            {state.auth.firstName} {state.auth?.lastName}
          </h4>
        </div>
      )}

      {props.children}
    </div>
  );
};

export default Sidebar;
