import { useNavigate } from "react-router-dom";

export function PrimaryButton() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        @keyframes rotateFull {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow-primary::before {
          content: '';
          position: absolute;
          z-index: -2;
          pointer-events: none;
          inset: 0; /* Ensures it's constrained inside the parent */
          width: 100%;
          height: 100%;
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 50% 30%;
          filter: blur(6px);
          background-image: linear-gradient(#FFF);
          animation: rotateFull 4s linear infinite;
        }
      `}</style>

      <div className="rainbow-primary relative z-0 bg-white/15 overflow-hidden p-0.5 inline-flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 w-fit">
        <button
          onClick={() => navigate("/ai")}
          className="px-4 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur cursor-pointer"
        >
          Start creating now
        </button>
      </div>
    </>
  );
}

export function SecondaryButton() {
  return (
    <>
      <style>{`
        @keyframes rotateSwing {
          0%   { transform: rotate(70deg); }
          50%  { transform: rotate(100deg); }
          100% { transform: rotate(70deg); }
        }

        .rainbow-secondary::before {
          content: '';
          position: absolute;
          z-index: -2;
          pointer-events: none;
          inset: 0; /* Ensures it's constrained inside the parent */
          width: 100%;
          height: 100%;
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 50% 30%;
          filter: blur(6px);
          background-image: linear-gradient(#FFF);
          animation: rotateSwing 4s ease-in-out infinite;
        }
      `}</style>

      <div className="rainbow-secondary relative z-0 bg-white/15 overflow-hidden p-0.5 inline-flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 w-fit">
        <button className="px-4 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur cursor-pointer">
          Watch demo
        </button>
      </div>
    </>
  );
}
