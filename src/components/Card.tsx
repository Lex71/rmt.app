interface CardProps {
  title: string;
  subtitle: string;
  image: string;
  details?: Record<string, string>;
}

export default function Card({ details, image, subtitle, title }: CardProps) {
  return (
    <div className="mx-auto border-2 border-gray-400 rounded-2xl bg-black/5 outline outline-white/15 backdrop-blur-md dark:bg-white/10">
      <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8">
        <div>
          <img className="size-48 shadow-xl rounded-md" alt="" src={image} />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-medium">{title}</span>
          <span className="font-medium text-sky-500">{subtitle}</span>
          <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
            {/* <span>No. 4</span>
          <span>·</span>
          <span>2025</span> */}
            {details &&
              Object.entries(details).map(([key, value], index) => (
                <>
                  <span key={key}>
                    {key}: {value}
                  </span>
                  {index === Object.keys(details).length - 1 ? null : (
                    <span>·</span>
                  )}
                </>
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}
