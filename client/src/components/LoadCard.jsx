import "../styles/loadCard.css";
import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadCard({ detail }) {
  return (
    <SkeletonTheme baseColor="#AEAEAE" highlightColor="#DFDFDF">
      <div className="skeleton">
        {!detail ? (
          <div className="default">
            <div className="img">
              <Skeleton width={100} height={100} />
            </div>
            <div className="info">
              <Skeleton variant="text" width={200} height={20} />
              <Skeleton variant="text" width={100} height={15} />
              <Skeleton count={3} width={100} height={10} />
              <Skeleton variant="text" width={150} height={20} />
            </div>
          </div>
        ) : (
          <div className="detail">
            <div>
              <div className="img">
                <Skeleton width={170} height={170} />
              </div>
              <div className="info">
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={100} height={15} />
                <Skeleton count={3} width={100} height={10} />
                <Skeleton variant="text" width={150} height={20} />
              </div>
            </div>
            <div className="description">
              <Skeleton variant="rectangular" height={50} />
              <div className="buttons">
                <Skeleton variant="text" width={100} height={40} />
                <Skeleton variant="text" width={100} height={40} />
              </div>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}
