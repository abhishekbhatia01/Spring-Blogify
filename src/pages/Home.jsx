import React from "react";
import Testimonial from "../components/Testimonial";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-32">
        <div className="max-md:text-center">
          <h5 className="text-4xl md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
            Write, Share, and Grow as a Developer
          </h5>

          <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-slate-600">
            Join a community of developers sharing their knowledge and building
            skills through blogs, tutorials, and hands-on coding experiences.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => navigate("/create")}
              className="px-8 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all"
              type="button"
            >
              Start Writing
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="px-5 py-3 rounded-md bg-white text-indigo-600 border border-indigo-400 flex items-center gap-2 hover:bg-indigo-600/5 active:scale-95 transition-all"
              type="button"
            >
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.68395 9.89231C6.62515 9.66436 6.50633 9.45634 6.33987 9.28988C6.17341 9.12341 5.96538 9.0046 5.73743 8.94579L1.69644 7.90377C1.6275 7.8842 1.56682 7.84267 1.52362 7.7855C1.48041 7.72832 1.45703 7.65861 1.45703 7.58694C1.45703 7.51527 1.48041 7.44556 1.52362 7.38839C1.56682 7.33121 1.6275 7.28969 1.69644 7.27012L5.73743 6.22743C5.9653 6.16868 6.17327 6.04997 6.33973 5.88363C6.50618 5.71729 6.62504 5.5094 6.68395 5.28157L7.72598 1.24058C7.74535 1.17137 7.78683 1.11039 7.84409 1.06695C7.90136 1.02351 7.97126 1 8.04313 1C8.11501 1 8.18491 1.02351 8.24217 1.06695C8.29943 1.11039 8.34092 1.17137 8.36029 1.24058L9.40166 5.28157C9.46046 5.50952 9.57928 5.71755 9.74574 5.88401C9.9122 6.05047 10.1202 6.16928 10.3482 6.22809L14.3892 7.26946C14.4587 7.28863 14.5199 7.33006 14.5636 7.38741C14.6073 7.44476 14.6309 7.51486 14.6309 7.58694C14.6309 7.65903 14.6073 7.72912 14.5636 7.78647C14.5199 7.84382 14.4587 7.88526 14.3892 7.90442L10.3482 8.94579C10.1202 9.0046 9.9122 9.12341 9.74574 9.28988C9.57928 9.45634 9.46046 9.66436 9.40166 9.89231L8.35963 13.9333C8.34026 14.0025 8.29878 14.0635 8.24151 14.1069C8.18425 14.1504 8.11435 14.1739 8.04247 14.1739C7.9706 14.1739 7.9007 14.1504 7.84344 14.1069C7.78617 14.0635 7.74469 14.0025 7.72532 13.9333L6.68395 9.89231Z"
                  stroke="#4F39F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3105 1.66016V4.29487"
                  stroke="#4F39F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6328 2.97656H11.998"
                  stroke="#4F39F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.76953 10.8809V12.1982"
                  stroke="#4F39F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.42673 11.541H2.10938"
                  stroke="#4F39F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Explore Blogs</span>
            </button>
          </div>

          <div className="flex items-center mt-9">
            <div className="flex -space-x-3.5 pr-3">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="user"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-1"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="user"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[2]"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="user"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[3]"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
                alt="user"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[4]"
              />
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
                alt="user"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[5]"
              />
            </div>

            <div>
              <div className="flex items-center gap-px">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                        fill="#FF8F20"
                      />
                    </svg>
                  ))}
              </div>
              <p className="text-sm text-slate-500">Used by 1,000+ people</p>
            </div>
          </div>
        </div>

        <div className="w-full md:max-w-xs lg:max-w-lg">
          <img
            className="w-full h-auto"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/users-group.png"
            alt="hero"
          />
        </div>
      </div>
      <Testimonial />
      <>
        <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        <div className="max-w-5xl py-16 md:pl-20 md:w-full mx-2 md:mx-auto p-4 flex flex-col md:flex-row items-center justify-between text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-2xl md:p-10 text-white">
          <div>
            <div>
              <p className="text-slate-200">Trusted by 12k+ developers</p>
              <div className="flex items-center gap-2">
                <svg
                  width="95"
                  height="18"
                  viewBox="0 0 95 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.52447 1.46353C8.67415 1.00287 9.32585 1.00287 9.47553 1.46353L10.9084 5.87336C10.9753 6.07937 11.1673 6.21885 11.3839 6.21885H16.0207C16.505 6.21885 16.7064 6.83865 16.3146 7.12336L12.5633 9.84878C12.3881 9.9761 12.3148 10.2018 12.3817 10.4078L13.8145 14.8176C13.9642 15.2783 13.437 15.6613 13.0451 15.3766L9.29389 12.6512C9.11865 12.5239 8.88135 12.5239 8.70611 12.6512L4.95488 15.3766C4.56303 15.6613 4.03578 15.2783 4.18546 14.8176L5.6183 10.4078C5.68524 10.2018 5.61191 9.9761 5.43667 9.84878L1.68544 7.12336C1.29358 6.83866 1.49497 6.21885 1.97933 6.21885H6.6161C6.83272 6.21885 7.02469 6.07937 7.09163 5.87336L8.52447 1.46353Z"
                    fill="#E12AFB"
                  />
                  <path
                    d="M27.5831 1.46353C27.7327 1.00287 28.3844 1.00287 28.5341 1.46353L29.967 5.87336C30.0339 6.07937 30.2259 6.21885 30.4425 6.21885H35.0793C35.5636 6.21885 35.765 6.83865 35.3732 7.12336L31.6219 9.84878C31.4467 9.9761 31.3734 10.2018 31.4403 10.4078L32.8731 14.8176C33.0228 15.2783 32.4956 15.6613 32.1037 15.3766L28.3525 12.6512C28.1772 12.5239 27.9399 12.5239 27.7647 12.6512L24.0135 15.3766C23.6216 15.6613 23.0944 15.2783 23.2441 14.8176L24.6769 10.4078C24.7438 10.2018 24.6705 9.9761 24.4953 9.84878L20.744 7.12336C20.3522 6.83866 20.5536 6.21885 21.0379 6.21885H25.6747C25.8913 6.21885 26.0833 6.07937 26.1502 5.87336L27.5831 1.46353Z"
                    fill="#E12AFB"
                  />
                  <path
                    d="M46.6417 1.46353C46.7913 1.00287 47.443 1.00287 47.5927 1.46353L49.0256 5.87336C49.0925 6.07937 49.2845 6.21885 49.5011 6.21885H54.1379C54.6222 6.21885 54.8236 6.83865 54.4317 7.12336L50.6805 9.84878C50.5053 9.9761 50.4319 10.2018 50.4989 10.4078L51.9317 14.8176C52.0814 15.2783 51.5542 15.6613 51.1623 15.3766L47.4111 12.6512C47.2358 12.5239 46.9985 12.5239 46.8233 12.6512L43.0721 15.3766C42.6802 15.6613 42.153 15.2783 42.3026 14.8176L43.7355 10.4078C43.8024 10.2018 43.7291 9.9761 43.5539 9.84878L39.8026 7.12336C39.4108 6.83866 39.6122 6.21885 40.0965 6.21885H44.7333C44.9499 6.21885 45.1419 6.07937 45.2088 5.87336L46.6417 1.46353Z"
                    fill="#E12AFB"
                  />
                  <path
                    d="M65.6963 1.46353C65.846 1.00287 66.4977 1.00287 66.6474 1.46353L68.0802 5.87336C68.1472 6.07937 68.3392 6.21885 68.5558 6.21885H73.1925C73.6769 6.21885 73.8783 6.83865 73.4864 7.12336L69.7352 9.84878C69.56 9.9761 69.4866 10.2018 69.5536 10.4078L70.9864 14.8176C71.1361 15.2783 70.6089 15.6613 70.217 15.3766L66.4658 12.6512C66.2905 12.5239 66.0532 12.5239 65.878 12.6512L62.1268 15.3766C61.7349 15.6613 61.2077 15.2783 61.3573 14.8176L62.7902 10.4078C62.8571 10.2018 62.7838 9.9761 62.6085 9.84878L58.8573 7.12336C58.4655 6.83866 58.6668 6.21885 59.1512 6.21885H63.788C64.0046 6.21885 64.1966 6.07937 64.2635 5.87336L65.6963 1.46353Z"
                    fill="#E12AFB"
                  />
                  <path
                    d="M84.7588 1.46353C84.9085 1.00287 85.5602 1.00287 85.7099 1.46353L87.1427 5.87336C87.2097 6.07937 87.4017 6.21885 87.6183 6.21885H92.255C92.7394 6.21885 92.9408 6.83865 92.5489 7.12336L88.7977 9.84878C88.6225 9.9761 88.5491 10.2018 88.6161 10.4078L90.0489 14.8176C90.1986 15.2783 89.6714 15.6613 89.2795 15.3766L85.5283 12.6512C85.353 12.5239 85.1157 12.5239 84.9405 12.6512L81.1893 15.3766C80.7974 15.6613 80.2702 15.2783 80.4198 14.8176L81.8527 10.4078C81.9196 10.2018 81.8463 9.9761 81.671 9.84878L77.9198 7.12336C77.528 6.83866 77.7293 6.21885 78.2137 6.21885H82.8505C83.0671 6.21885 83.2591 6.07937 83.326 5.87336L84.7588 1.46353Z"
                    fill="#E12AFB"
                  />
                </svg>
                <span className="text-sm text-slate-300">
                  4.5/5 • 2300+ Reviews
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-[46px] max-md:mt-3 text-balance md:leading-[60px] max-w-md font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
              Join our newsletter & Stay Updated
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-violet-900 max-md:mt-6 pl-4 h-11 text-sm rounded-full overflow-hidden">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 5.25L9.75675 9.54525C9.52792 9.67816 9.268 9.74817 9.00337 9.74817C8.73875 9.74817 8.47883 9.67816 8.25 9.54525L1.5 5.25"
                stroke="#CAD5E2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 3H3C2.17157 3 1.5 3.67157 1.5 4.5V13.5C1.5 14.3284 2.17157 15 3 15H15C15.8284 15 16.5 14.3284 16.5 13.5V4.5C16.5 3.67157 15.8284 3 15 3Z"
                stroke="#CAD5E2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Enter your email..."
              className="outline-none h-11 bg-transparent"
            />
            <button className="px-6 h-10 mr-1 rounded-full border border-violet-600 bg-violet-800">
              Subscribe
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default Home;
