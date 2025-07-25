// import Title from "./Title.jsx";

// function Testimonials() {
//   const dummyTestimonialData = [
//     {
//       image:
//         "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
//       name: "John Doe",
//       title: "Marketing Director, TechCorp",
//       content:
//         "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
//       rating: 4,
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
//       name: "Jane Smith",
//       title: "Content Creator, TechCorp",
//       content:
//         "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
//       rating: 5,
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
//       name: "David Lee",
//       title: "Content Writer, TechCorp",
//       content:
//         "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
//       rating: 4,
//     },
//   ];

//   return (
//     <div>
//       <Title
//         title={"Loved by Creators"}
//         subtitle={
//           "Don't just take our word for it. Here's what our users are saying."
//         }
//       />
//       <div className="flex flex-wrap mt-10 justify-center">
//         {dummyTestimonialData.map((testimonial, index) => (
//           <div
//             key={index}
//             className="p-8 m-4 max-w-xs rounded-lg bg-[#20232A] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer"
//           >
//             <div className="flex items-center gap-1">
//               <svg
//                 width="16"
//                 height="15"
//                 viewBox="0 0 16 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
//                   fill="#5044E5"
//                 />
//               </svg>
//               <svg
//                 width="16"
//                 height="15"
//                 viewBox="0 0 16 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
//                   fill="#5044E5"
//                 />
//               </svg>
//               <svg
//                 width="16"
//                 height="15"
//                 viewBox="0 0 16 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
//                   fill="#5044E5"
//                 />
//               </svg>
//               <svg
//                 width="16"
//                 height="15"
//                 viewBox="0 0 16 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
//                   fill="#5044E5"
//                 />
//               </svg>
//               <svg
//                 width="16"
//                 height="15"
//                 viewBox="0 0 16 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
//                   fill="#5044E5"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-500 text-sm my-5">
//               "{testimonial.content}"
//             </p>
//             <hr className="mb-5 border-gray-300" />
//             <div className="flex items-center gap-4">
//               <img
//                 src={testimonial.image}
//                 className="w-12 object-contain rounded-full"
//                 alt=""
//               />
//               <div className="text-sm text-gray-600">
//                 <h3 className="font-medium">{testimonial.name}</h3>
//                 <p className="text-xs text-gray-500">{testimonial.title}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Testimonials;

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

import Title from "./Title.jsx";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { dummyTestimonialData, assets } from "../assets/assets.js";

const Step = ({ title }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

function Testimonials() {
  return (
    <div className="px-4 sm:px-20 xl:px-32 mb-20">
      <Title
        title="Loved by Creators"
        subtitle="Don't just take our word for it. Here's what our users are saying."
      />

      <div className="flex flex-wrap gap-5 justify-center mt-10">
        {dummyTestimonialData.map((item) => (
          <CardSpotlight className="h-66 w-96">
            <div className="flex items-center gap-6">
              <img
                className="w-12 h-12 rounded-full relative z-20"
                src={item.image}
                alt={item.name}
              />
              <div>
                <p className="font-bold text-xl text-white relative z-20">
                  {item.name}
                </p>
                <p className="text-gray-500 text-base relative z-20">
                  {item.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 relative z-20">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <img
                    src={
                      idx < item.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    key={idx}
                  />
                ))}
            </div>
            <p className="text-neutral-300 mt-4 relative z-20 text-[16px]">
              "{item.content}"
            </p>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
