function Title({ title, subtitle }) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-[40px] text-white font-semibold">
        {title}
      </h1>
      <p className="text-sm md:text-base mt-2 max-w-lg text-white mx-auto mb-8">
        {subtitle}
      </p>
    </div>
  );
}

export default Title;
