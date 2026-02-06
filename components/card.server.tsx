import Image from "next/image";
import Link from "next/link";

type cardProps = {
  name: string;
  imgUrl: string;
  href: string;
};

const Card = ({ name, imgUrl, href }: cardProps) => {
  return (
    <Link href={href} className="m-auto rounded-xl border-gray-400 shadow-2xl">
      <div className="glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl">
        <div className="my-3">
          <h2 className="w-64 text-ellipsis  whitespace-nowrap text-xl font-bold">
            {name}
          </h2>
        </div>
        <Image
          className="max-h-[200px] min-h-[200px] rounded-lg shadow-lg object-cover"
          src={imgUrl}
          alt={name}
          width={260}
          height={260}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEECAYAAADOCEoKAAACTklEQVR42u3UMQEAAAQAMJLr6lGDR4stxHKmKwBOCgEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEACEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARCCEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARCCEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIAUAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQgBOAt0Vo87rqIIIQAAAAASUVORK5CYII="
          placeholder="blur"
        />
      </div>
    </Link>
  );
};

export default Card;
