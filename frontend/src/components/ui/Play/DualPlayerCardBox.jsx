import React from "react";
import { useSelector } from "react-redux";
import PlayerCard from "./PlayerCard";
import AnimatedButton from "../Other/AnimatedButton";
import PlayerCardSkeleton from "../../skeletons/PlayerCardSkeleton";

const DualPlayerCardBox = ({ participants, loading, stats }) => {
  const user = useSelector((state) => state.user.userData);
  const myInfo = participants.find((p) => p.userId === user?._id);
  const opponent = participants.find((p) => p.userId !== user?._id);

  console.log("opponent", opponent);

  return (
    <div className="flex items-center justify-between w-[680px]">
      {/* Left Container */}
      <div className="flex-1 flex justify-start">
        {myInfo ? (
          <PlayerCard user={myInfo} mode={"duel"} stats={stats} />
        ) : (
          <PlayerCardSkeleton text={""} />
        )}
      </div>

      {/* Center Container */}
      <div className="flex-[0.5] flex justify-center">
        <AnimatedButton
          title="VS"
          animated={false}
          className={`px-6 h-16 text-3xl font-logo tracking-wide ${
            loading
              ? "text-transparent animate-pulse  border-bgprimary bg-bgprimary"
              : "text-white border-bdshadow"
          } rounded-lg border-4`}
        />
      </div>

      {/* Right Container */}
      <div className="flex-1 flex justify-end">
        {opponent ? (
          <PlayerCard user={opponent} stats={opponent} />
        ) : (
          <PlayerCardSkeleton text={loading ? "" : "Finding Opponent..."} />
        )}
      </div>
    </div>
  );
};

export default DualPlayerCardBox;
