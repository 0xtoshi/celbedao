import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Avatar } from "@nextui-org/react";
import { useEffect } from "react";

export default function HeroSection() {
  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = 1698760800; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  return (
    <>
      <div
        className="bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30"
        id="home"
      >
        <div className=" mx-auto py-8 md:px-12 xl:px-6 mt-2 text-center ">
          <div className="lg:w-full">
            <center>
              <Avatar
                isBordered
                color="secondary"
                size="lg"
                src="/celestia.png"
                className="mb-3"
              />
            </center>
            <h1 className="text-gray-900 dark:text-white font-bold text-2xl md:text-3xl xl:text-3xl ">
              Celestia Mainnet Launch Countdown
            </h1>

            <div className="flex justify-center gap-2 sm:shrink App mb-5">
              <div>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#000"
                  duration={daySeconds}
                  initialRemainingTime={remainingTime % daySeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat:
                      remainingTime - totalElapsedTime > hourSeconds,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        "hours",
                        getTimeHours(daySeconds - elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
              </div>
              <div>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#000"
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat:
                      remainingTime - totalElapsedTime > minuteSeconds,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        "minutes",
                        getTimeMinutes(hourSeconds - elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
              </div>
              <div>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="#000"
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime("seconds", getTimeSeconds(elapsedTime))}
                    </span>
                  )}
                </CountdownCircleTimer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
