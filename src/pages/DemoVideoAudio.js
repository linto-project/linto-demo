import VideoAudio from "../components/VideoAudio";
import "./Demo.css";

const DemoVideoAudio = () => {
  return (
    <div className="demo">
      <VideoAudio framerate={25} />
    </div>
  );
};

export default DemoVideoAudio;
