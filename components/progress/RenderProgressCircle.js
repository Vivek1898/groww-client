// import { Progress } from "antd";
// import CountTo from "react-count-to";
// import Link from "next/link";

// const RenderProgress = ({ number, name, link = "#" }) => (
//   <Link href={link}>
//     <a>
//       <Progress
//         type="circle"
//         strokeColor={{
//           "0%": "#666",
//           "50%": "#fff",
//           "100%": "#111",
//         }}
//         percent={100}
//         format={() => <CountTo to={number} speed={number * 100} />}
//       />
//       <p style={{ marginTop: 18, color: "#666" }}>{name.toUpperCase()}</p>
//     </a>
//   </Link>
// );

// export default RenderProgress;

// import { Progress } from "antd";
// import AnimatedNumber from "react-animated-numbers";
// import Link from "next/link";

// const RenderProgress = ({ number, name, link = "#" }) => (
//   <Link href={link}>
//     <a>
//       <Progress
//         type="circle"
//         strokeColor={{
//           "0%": "#666",
//           "50%": "#fff",
//           "100%": "#111",
//         }}
//         percent={100}
//         format={() => (
//           <AnimatedNumber
//             value={number}
//             formatValue={(value) => value.toFixed(0)}
//             duration={1000}
//           />
//         )}
//       />
//       <p style={{ marginTop: 18, color: "#666" }}>{name.toUpperCase()}</p>
//     </a>
//   </Link>
// );

// export default RenderProgress;


import { Progress } from "antd";
import CountUp from "react-countup";
import Link from "next/link";

const RenderProgress = ({ number, name, link = "#" }) => (
 
    <>
      <Progress
        type="circle"
       
        percent={100}
        format={() => <CountUp end={number} duration={2} />}
      />
      {/* <div>
      <CountUp end={number} duration={2} />
      </div> */}
      <p style={{ marginTop: 18, color: "#666" }}>{name.toUpperCase()}</p>
    </>
 
);

export default RenderProgress;

