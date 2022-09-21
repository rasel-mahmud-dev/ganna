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
        <div>
          <div className="avatar">
            <img src={staticPath(state.auth.avatar)} alt="" />
          </div>
          <h4>
            {state.auth.firstName} {state.auth?.lastName}
          </h4>
        </div>
      )}

      {props.children}
    </div>
  );
};

export default Sidebar;
